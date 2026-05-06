# datannur docs

Static landing page for [docs.datannur.com](https://docs.datannur.com). It routes visitors to the two separate datannur documentation sites:

- `app/`: documentation for the catalog interface.
- `builder/`: documentation for the metadata scanner package.

This repository intentionally contains only the small public entry page and its assets. The actual documentation sites live in their own repositories.

## Development

Open `index.html` directly in a browser to preview the page.

## Deployment

Deployment uses `rsync` over SSH:

```sh
npm run deploy
```

Create a local `deploy.config.json` from `deploy.config.example.json` before deploying. The real deployment config is ignored by Git because it contains environment-specific hosting details.

## License

MIT
