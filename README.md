# Oberdola — Vogteier Imbiss

Next-generation restaurant website for Vogteier Imbiss in Oberdorla, Germany.

## Live website

[vogteierimbiss.best](https://vogteierimbiss.best)

## Features

- Complete searchable and filterable menu
- Phone and WhatsApp ordering
- Europe/Berlin opening-status calculation
- Responsive motion-rich street-food design
- Delivery areas, opening hours, Impressum, and Datenschutz
- Accessible keyboard, reduced-motion, and mobile behavior

## Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm test
npm run build:pages
```

Built with Next.js, React, TypeScript, Tailwind CSS, and Vinext.

## GitHub Pages

The `Deploy to GitHub Pages` workflow publishes the static export from `out/`
whenever `main` is updated. In **Settings → Pages**, select **GitHub Actions**
as the source and set the custom domain to `vogteierimbiss.best`.
