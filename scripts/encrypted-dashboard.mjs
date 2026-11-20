import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { webcrypto, createHash, randomBytes } from "node:crypto";
import { gzipSync, gunzipSync } from "node:zlib";

export const root = fileURLToPath(new URL("../", import.meta.url));
export const privateRoot = path.resolve(process.env.DASHBOARD_SOURCE_DIR || path.join(root, ".private/source"));
export const sourceFiles = ["index.html", "app.js", "styles.css", "data/dataflex-overlap.json"];
export const publicFiles = ["index.html", "styles.css", "public.js", "unlock.js", "unlock.css", "favicon.png", ".nojekyll"];
const envelopePath = path.join(root, "dashboard.enc.json");
const utf8 = new TextEncoder();

export function requirePassword() {
  const value = process.env.DASHBOARD_PASSWORD;
  if (!value) throw new Error("Missing DASHBOARD_PASSWORD; refusing plaintext fallback.");
  return value;
}

function headerOf(envelope) {
  return { version: envelope.version, cipher: envelope.cipher, compression: envelope.compression, kdf: envelope.kdf };
}

function validateEnvelope(envelope) {
  if (envelope.version !== 1 || envelope.cipher !== "AES-GCM-256" || envelope.compression !== "gzip" ||
      envelope.kdf?.name !== "PBKDF2" || envelope.kdf.hash !== "SHA-256" || envelope.kdf.iterations !== 600000 ||
      Buffer.from(envelope.kdf.salt, "base64").length !== 32 || Buffer.from(envelope.iv, "base64").length !== 12) {
    throw new Error("Unsupported encrypted dashboard format.");
  }
}

export async function deriveKey(password, kdf) {
  const material = await webcrypto.subtle.importKey("raw", utf8.encode(password), "PBKDF2", false, ["deriveKey"]);
  return webcrypto.subtle.deriveKey({ name: "PBKDF2", hash: kdf.hash, iterations: kdf.iterations, salt: Buffer.from(kdf.salt, "base64") },
    material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

export async function decrypt(envelope, password) {
  validateEnvelope(envelope);
  const key = await deriveKey(password, envelope.kdf);
  const compressed = await webcrypto.subtle.decrypt({ name: "AES-GCM", iv: Buffer.from(envelope.iv, "base64"),
    additionalData: utf8.encode(JSON.stringify(headerOf(envelope))), tagLength: 128 }, key, Buffer.from(envelope.ciphertext, "base64"));
  const bundle = JSON.parse(gunzipSync(Buffer.from(compressed)).toString("utf8"));
  if (bundle.version !== 1 || !bundle.files || sourceFiles.some((name) => typeof bundle.files[name] !== "string")) {
    throw new Error("Incomplete encrypted source bundle.");
  }
  return bundle;
}

export async function encrypt(bundle, password, previous) {
  // Keep the KDF parameters after authenticating the old bundle, so remembered keys survive daily updates.
  if (previous) await decrypt(previous, password);
  const header = { version: 1, cipher: "AES-GCM-256", compression: "gzip", kdf: previous?.kdf || {
    name: "PBKDF2", hash: "SHA-256", iterations: 600000, salt: randomBytes(32).toString("base64")
  } };
  const key = await deriveKey(password, header.kdf);
  const iv = randomBytes(12);
  const plaintext = Buffer.from(JSON.stringify(bundle));
  const compressed = gzipSync(plaintext, { level: 9 });
  const ciphertext = await webcrypto.subtle.encrypt({ name: "AES-GCM", iv,
    additionalData: utf8.encode(JSON.stringify(header)), tagLength: 128 }, key, compressed);
  return { ...header, iv: iv.toString("base64"), ciphertext: Buffer.from(ciphertext).toString("base64") };
}

export async function readBundle() {
  const files = {};
  for (const name of sourceFiles) files[name] = await fs.readFile(path.join(privateRoot, name), "utf8");
  return { version: 1, files };
}

export async function restoreSource() {
  const bundle = await decrypt(JSON.parse(await fs.readFile(envelopePath, "utf8")), requirePassword());
  for (const name of sourceFiles) {
    const target = path.join(privateRoot, name);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, bundle.files[name], { mode: 0o600 });
  }
  return bundle;
}

export function publicView(bundle) {
  const html = bundle.files["index.html"];
  const app = bundle.files["app.js"];
  const anchor = '      <section class="panel traffic-panel">';
  const boundary = html.indexOf(anchor);
  const mainEnd = html.lastIndexOf("    </main>");
  if (boundary < 0 || mainEnd < boundary || html.includes('id="protectedContent"')) throw new Error("Unexpected original page boundary.");
  const init = app.lastIndexOf("\nrenderLastUpdatedBadge();");
  if (init < 0) throw new Error("Original dashboard initializer missing.");
  const elements = new Map();
  const document = { getElementById(id) {
    if (!elements.has(id)) elements.set(id, { innerHTML: "", textContent: "", querySelectorAll() { return []; } });
    return elements.get(id);
  } };
  vm.runInNewContext(app.slice(0, init) + "\nrenderLastUpdatedBadge(); renderSummary(); renderTrendChart();", { document, Intl }, { timeout: 10000 });
  const summary = elements.get("summary").innerHTML;
  const chart = elements.get("mainChart").innerHTML;
  let prefix = html.slice(0, boundary)
    .replace(/(<section class="summary-grid" id="summary">)[\s\S]*?<\/section>/, (_, start) => start + summary + "</section>")
    .replace(/(<div id="mainChart"[^>]*>)[\s\S]*?<\/div>/, (_, start) => start + chart + "</div>")
    .replace(/\.\/styles\.css\?v=[^"]+/, "./styles.css?v=" + createHash("sha256").update(bundle.files["styles.css"]).digest("hex").slice(0, 16));
  prefix = prefix.replace("  </head>", '    <link rel="stylesheet" href="./unlock.css?v=1" />\n  </head>');
  return { prefix, protectedHtml: html.slice(boundary, mainEnd), app, summary, chart };
}

function gateMarkup() {
  return `      <section class="panel decrypt-gate" id="decryptGate">
        <h2>解锁后续内容</h2>
        <p>输入口令，解密并查看后续看板内容。</p>
        <form id="decryptForm">
          <label for="decryptPassword">解锁口令</label>
          <div class="decrypt-controls"><input id="decryptPassword" type="password" autocomplete="current-password" required /><button type="submit" id="decryptButton">解锁</button></div>
          <label class="decrypt-remember"><input id="rememberUnlock" type="checkbox" checked /> 在此浏览器记住解锁状态</label>
          <p id="decryptError" role="alert" aria-live="polite"></p>
        </form>
        <noscript>此页面需要启用 JavaScript 才能解密。</noscript>
      </section>
      <template id="protectedMount"></template>
    </main>
    <button id="relockButton" class="relock-button" type="button" hidden>重新锁定</button>`;
}

export async function build() {
  const password = requirePassword();
  const bundle = await readBundle();
  const view = publicView(bundle);
  let previous;
  try { previous = JSON.parse(await fs.readFile(envelopePath, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
  const envelope = await encrypt(bundle, password, previous);
  const roundtrip = await decrypt(envelope, password);
  if (JSON.stringify(bundle) !== JSON.stringify(roundtrip)) throw new Error("Encrypted source did not round-trip exactly.");
  const html = view.prefix + gateMarkup() + '\n    <script id="encryptedDashboard" type="application/json">' + JSON.stringify(envelope) + '</script>\n    <script src="./public.js?v=1"></script>\n    <script src="./unlock.js?v=1"></script>\n  </body>\n</html>\n';
  // No report HTML, original application/data source, password or reusable key enters these outputs.
  await fs.writeFile(envelopePath, JSON.stringify(envelope) + "\n");
  await fs.writeFile(path.join(root, "index.html"), html);
  await fs.writeFile(path.join(root, "styles.css"), bundle.files["styles.css"]);
  await verify();
}

export async function verify() {
  const envelope = JSON.parse(await fs.readFile(envelopePath, "utf8"));
  const bundle = await decrypt(envelope, requirePassword());
  const html = await fs.readFile(path.join(root, "index.html"), "utf8");
  const inline = html.match(/<script id="encryptedDashboard" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
  if (!inline || JSON.stringify(JSON.parse(inline)) !== JSON.stringify(envelope)) throw new Error("Published ciphertext differs from encrypted source.");
  const view = publicView(bundle);
  if (!html.startsWith(view.prefix)) throw new Error("Public content differs from original view.");
  const textFiles = ["index.html", "styles.css", "public.js", "unlock.js", "unlock.css", "dashboard.enc.json"];
  const forbidden = [requirePassword(), 'const trafficRows', 'const benchmarkRepos', 'const trafficWindowTotals',
    'class="panel traffic-panel"', 'class="panel stargazer-overlap-panel"', '"topRepos":', '"categories":'];
  for (const name of textFiles) {
    const text = await fs.readFile(path.join(root, name), "utf8");
    if (forbidden.some((marker) => text.includes(marker))) throw new Error("Protected plaintext detected in " + name);
  }
  for (const name of ["app.js", "access-gate.js", "data/dataflex-overlap.json"]) {
    try { await fs.access(path.join(root, name)); throw new Error("Unencrypted legacy file remains: " + name); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
  }
}

export async function stage() {
  await verify();
  const dist = path.join(root, "dist");
  await fs.mkdir(dist, { recursive: true });
  const existing = await fs.readdir(dist);
  if (existing.some((name) => !publicFiles.includes(name))) throw new Error("Unexpected file in deployment directory.");
  for (const name of publicFiles) await fs.copyFile(path.join(root, name), path.join(dist, name));
}

const command = process.argv[2];
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (command === "decrypt") await restoreSource();
    else if (command === "build") await build();
    else if (command === "verify") await verify();
    else if (command === "stage") await stage();
    else throw new Error("Use decrypt, build, verify, or stage.");
    console.log("Encrypted dashboard " + command + " completed.");
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
