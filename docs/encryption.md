# Encryption and deployment

The summary and daily-star chart are public. All remaining dashboard HTML, the original application and report source are compressed with gzip and encrypted using AES-256-GCM. PBKDF2-SHA-256 (600,000 iterations, random 32-byte salt) derives the key. Every build uses a fresh 12-byte IV and authenticates the envelope metadata.

## Secrets

Set repository Actions Secrets `DASHBOARD_PASSWORD` and `GH_TOKEN`. Never commit either value. Pages must use GitHub Actions, not a branch checkout. The workflow decrypts into runner temporary storage, updates data, re-encrypts, authenticates a complete round trip, then uploads only the seven-file public allowlist. Any failed step prevents deployment. The always-run cleanup removes temporary plaintext.

`dashboard.enc.json` is the encrypted authoritative source. The website includes that ciphertext inline so local HTML does not need to fetch private source. There is no plaintext password comparison or unencrypted application/report fallback. Current plaintext source is excluded from the tracked tree and Pages artifacts.

## Local source

Provide `DASHBOARD_PASSWORD` through the process environment without putting it in a tracked file or command argument. Run the commands in README. Decrypted source defaults to ignored `.private/source/`; `DASHBOARD_SOURCE_DIR` can select an isolated temporary directory. Keep backups under ignored `.private/backups/`. Never force-add these files. Serve only `dist/` for local web preview.

The browser can remember a non-extractable derived `CryptoKey` in IndexedDB. No plaintext password is stored. The relock button deletes the key and reloads to discard decrypted content and application state. Clearing site data or changing browsers requires unlocking again. Password rotation must use a new salt to invalidate remembered keys; do not reuse an old envelope with a different password.

This protects new ciphertext, not previously public commits or copies. No history is rewritten. A downloaded ciphertext can be attacked by offline password guessing; password strength determines resistance. Authorized browsers can inspect decrypted content.
