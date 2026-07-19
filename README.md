# Spotify Landing

Static React + Vite landing page for a Spotify release with Meta Pixel tracking.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The deployable static site is written to `dist/`. For Cloudflare Pages use:

- Build command: `npm run build`
- Build output directory: `dist`

Release details, the Spotify URL, and the Meta Pixel ID are configured near the top of `src/App.tsx`. Images are stored in `public/`.
