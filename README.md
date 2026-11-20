# DataFlex encrypted dashboard

The summary and daily-star chart are public. The remaining original dashboard and reports are gzip-compressed and encrypted with AES-256-GCM. See [Encryption and deployment](docs/encryption.md).

## Local preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Then open `http://127.0.0.1:8765/`.

## Update dashboard data

```bash
node scripts/encrypted-dashboard.mjs decrypt
node update-dashboard.mjs
node scripts/encrypted-dashboard.mjs build
node --test tests/encrypted-dashboard.test.mjs
node scripts/encrypted-dashboard.mjs stage
```

Provide DASHBOARD_PASSWORD through the process environment. Decrypted source and backups belong only in ignored .private/. Never commit them. Pages is deployed by Actions from the verified public file allowlist.
