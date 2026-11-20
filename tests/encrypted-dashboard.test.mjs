import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes, webcrypto } from "node:crypto";
import fs from "node:fs/promises";
import { decrypt, encrypt, deriveKey, publicView } from "../scripts/encrypted-dashboard.mjs";

const password = randomBytes(24).toString("base64");
const bundle = { version: 1, files: { "index.html": "<h1>Private fixture</h1>", "app.js": "const fixture = 1;", "styles.css": "body{}", "data/dataflex-overlap.json": "{}" } };

test("compressed source authenticates, round-trips and rejects incorrect credentials or corruption", async () => {
  const envelope = await encrypt(bundle, password);
  assert.deepEqual(await decrypt(envelope, password), bundle);
  await assert.rejects(decrypt(envelope, password + "incorrect"));
  const corrupt = structuredClone(envelope);
  const bytes = Buffer.from(corrupt.ciphertext, "base64");
  bytes[0] ^= 1;
  corrupt.ciphertext = bytes.toString("base64");
  await assert.rejects(decrypt(corrupt, password));
  const metadata = structuredClone(envelope);
  metadata.compression = "none";
  await assert.rejects(decrypt(metadata, password));
  assert.equal(JSON.stringify(envelope).includes(password), false);
  assert.equal(JSON.stringify(envelope).includes("Private fixture"), false);
});

test("remembered non-extractable derived key survives updates with fresh IVs", async () => {
  const first = await encrypt(bundle, password);
  const key = await deriveKey(password, first.kdf);
  assert.equal(key.extractable, false);
  await assert.rejects(webcrypto.subtle.exportKey("raw", key));
  const second = await encrypt(bundle, password, first);
  assert.deepEqual(second.kdf, first.kdf);
  assert.notEqual(second.iv, first.iv);
  const header = { version: second.version, cipher: second.cipher, compression: second.compression, kdf: second.kdf };
  await webcrypto.subtle.decrypt({ name: "AES-GCM", iv: Buffer.from(second.iv, "base64"), additionalData: new TextEncoder().encode(JSON.stringify(header)) },
    structuredClone(key), Buffer.from(second.ciphertext, "base64"));
});

test("actual source decrypts exactly and contains the original protected boundary", async () => {
  if (!process.env.DASHBOARD_PASSWORD) return;
  const envelope = JSON.parse(await fs.readFile(new URL("../dashboard.enc.json", import.meta.url), "utf8"));
  const actual = await decrypt(envelope, process.env.DASHBOARD_PASSWORD);
  const view = publicView(actual);
  assert.ok(view.protectedHtml.startsWith('      <section class="panel traffic-panel">'));
  assert.ok(view.protectedHtml.includes("共同关注网络"));
  assert.ok(!view.prefix.includes("trafficRows"));
  assert.ok(!view.prefix.includes('class="panel traffic-panel"'));
  assert.ok(view.prefix.includes(view.summary));
  assert.ok(view.prefix.includes(view.chart));
});
