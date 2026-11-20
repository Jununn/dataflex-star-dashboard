(() => {
  "use strict";
  const gate = document.getElementById("decryptGate");
  const form = document.getElementById("decryptForm");
  const input = document.getElementById("decryptPassword");
  const button = document.getElementById("decryptButton");
  const remember = document.getElementById("rememberUnlock");
  const message = document.getElementById("decryptError");
  const relock = document.getElementById("relockButton");
  const envelope = JSON.parse(document.getElementById("encryptedDashboard").textContent);
  const header = { version: envelope.version, cipher: envelope.cipher, compression: envelope.compression, kdf: envelope.kdf };
  const keyId = JSON.stringify(envelope.kdf);
  const utf8 = new TextEncoder();
  let nodes = [];
  let busy = false;

  const bytes = (value) => Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  function database() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("dataflex-encrypted-dashboard", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("keys");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async function storage(mode, action) {
    const db = await database();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction("keys", mode);
        const request = action(tx.objectStore("keys"));
        tx.oncomplete = () => resolve(request.result);
        tx.onerror = tx.onabort = () => reject(tx.error);
      });
    } finally { db.close(); }
  }
  async function forget() {
    try { await storage("readwrite", (store) => store.clear()); }
    catch { /* A blocked database contains no accessible remembered key. */ }
    try { localStorage.removeItem("dataflex-dashboard-unlocked-v1"); } catch { /* Old display gate state. */ }
  }
  async function derive(password) {
    const material = await crypto.subtle.importKey("raw", utf8.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt: bytes(envelope.kdf.salt), iterations: envelope.kdf.iterations,
      hash: envelope.kdf.hash }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  }
  async function decode(key) {
    if (envelope.version !== 1 || envelope.compression !== "gzip" || envelope.cipher !== "AES-GCM-256" ||
        envelope.kdf.name !== "PBKDF2" || envelope.kdf.hash !== "SHA-256" || envelope.kdf.iterations !== 600000 ||
        bytes(envelope.kdf.salt).length !== 32 || bytes(envelope.iv).length !== 12) throw new Error("Unsupported format");
    const compressed = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(envelope.iv),
      additionalData: utf8.encode(JSON.stringify(header)), tagLength: 128 }, key, bytes(envelope.ciphertext));
    const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("gzip"));
    const bundle = JSON.parse(await new Response(stream).text());
    if (bundle.version !== 1 || typeof bundle.files?.["index.html"] !== "string" || typeof bundle.files?.["app.js"] !== "string") throw new Error("Incomplete bundle");
    return bundle;
  }
  function restore(bundle) {
    const original = new DOMParser().parseFromString(bundle.files["index.html"], "text/html");
    const sections = [...original.querySelector("main").children];
    const boundary = sections.findIndex((element) => element.classList.contains("traffic-panel"));
    if (boundary < 0) throw new Error("Missing protected section");
    const mount = document.getElementById("protectedMount");
    nodes = sections.slice(boundary).map((element) => document.importNode(element, true));
    nodes.forEach((element) => mount.before(element));
    // Execute the unchanged original application in a fresh scope. Its rendering, events and data are restored together.
    const script = document.createElement("script");
    script.textContent = "(() => {\n" + bundle.files["app.js"] + "\n})();";
    document.body.append(script);
    script.remove();
    gate.hidden = true;
    relock.hidden = false;
  }
  async function unlock(key) {
    const bundle = await decode(key);
    restore(bundle);
  }
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (busy) return;
    busy = true;
    button.disabled = true;
    message.textContent = "";
    const password = input.value;
    input.value = "";
    try {
      const key = await derive(password);
      await unlock(key);
      await forget();
      if (remember.checked) {
        try { await storage("readwrite", (store) => store.put(key, keyId)); }
        catch { relock.title = "浏览器未允许保存解锁状态；关闭页面后需要重新输入口令。"; }
      }
    } catch {
      nodes.forEach((node) => node.remove());
      nodes = [];
      gate.hidden = false;
      relock.hidden = true;
      message.textContent = "无法解密：口令不正确或密文已损坏。";
      input.focus();
    } finally { busy = false; button.disabled = false; }
  });
  relock.addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    nodes.forEach((node) => node.remove());
    nodes = [];
    gate.hidden = false;
    relock.hidden = true;
    await forget();
    // Reload clears decrypted application closures and event handlers from memory.
    location.reload();
  });
  (async () => {
    if (!globalThis.crypto?.subtle || !globalThis.DecompressionStream) {
      message.textContent = "请使用支持 Web Crypto 的现代浏览器，通过 HTTPS 或本地预览打开。";
      button.disabled = true;
      return;
    }
    busy = true;
    button.disabled = true;
    try {
      const key = await storage("readonly", (store) => store.get(keyId));
      if (key) {
        if (key.extractable || key.algorithm.name !== "AES-GCM") throw new Error("Invalid stored key");
        await unlock(key);
      }
    } catch { await forget(); }
    finally { busy = false; button.disabled = false; }
  })();
})();
