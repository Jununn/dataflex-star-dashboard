# DataFlex Star Growth & Actions Dashboard

Static GitHub Pages dashboard for tracking OpenDCAI/DataFlex star growth, public activity nodes, benchmark repositories, and recent Trendshift activity.

## Local preview

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

## Update dashboard data

```bash
node update-dashboard.mjs
```

The updater uses GitHub's privacy-safe star history endpoint for UTC daily counts, refreshes benchmark repositories, and falls back to public anonymous requests when the configured token has reached its rate limit.
