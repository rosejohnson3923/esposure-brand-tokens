# Rollout — adopting @esposure/brand-tokens across the portfolio

Status of consuming the shared token layer in each of the 4 portfolio sites.

| Site | Stack | Status | Branch / PR |
|---|---|---|---|
| pathfinity-website | React/Vite | ✅ **Piloted** — wired, build verified | `marketing/brand-tokens` (not yet merged to `master`) |
| pathcte-website | React/Vite | ⬜ Pending | — |
| esposure-website | static HTML | ⬜ Pending | — |
| esposure4all-website | static HTML | ⬜ Pending | — |

The pilot proved the mechanism: `github:` npm dependency → `@import
'@esposure/brand-tokens/css'` resolves in Vite → build green → bundle is a strict
superset of the old `MasterTheme.css` (312 vs 305 token defs; +7 are the glass
tokens). No visual regression.

---

## 1. pathcte-website (React/Vite) — mirror of the pilot

Identical to pathfinity-website (its `MasterTheme.css`/`visualHierarchy.ts` were
byte-identical). Note: its `node_modules` is **symlinked** to pathfinity-website's
— give it a real install or the dep won't resolve standalone.

```bash
cd pathcte-website
# replace the symlinked node_modules with a real one if building standalone:
# rm node_modules && npm install
```
`package.json` → add to dependencies:
```jsonc
"@esposure/brand-tokens": "github:rosejohnson3923/esposure-brand-tokens"
```
`src/index.css` → replace `@import './styles/MasterTheme.css';` with:
```css
@import '@esposure/brand-tokens/css';
```
Then `npm install && npm run build` and confirm the dist CSS carries `--color-primary`
and `--glass-*`. PathCTE keeps the shared purple accent (no brand overlay needed).

## 2. esposure-website (static HTML) — copy step

```jsonc
// package.json
"dependencies": { "@esposure/brand-tokens": "github:rosejohnson3923/esposure-brand-tokens" },
"scripts": {
  "build": "npm run sync:tokens",
  "sync:tokens": "cp node_modules/@esposure/brand-tokens/css/brand-tokens.css assets/css/ && cp node_modules/@esposure/brand-tokens/css/brands/esposure.css assets/css/"
}
```
Netlify `netlify.toml` → set `[build] command = "npm install && npm run build"`.
`index.html` `<head>` — load before the site stylesheet:
```html
<link rel="stylesheet" href="assets/css/brand-tokens.css" />
<link rel="stylesheet" href="assets/css/esposure.css" />
<link rel="stylesheet" href="assets/css/styles.css" />
```
Then prune the duplicated `:root` token block from `assets/css/styles.css` (keep only
esposure.gg-specific overrides), so tokens have a single source.

## 3. esposure4all-website (static HTML) — copy step + red overlay

Same as esposure-website but use the **esposure4all** overlay (red accent + Poppins +
red-tinted glass border):
```jsonc
"sync:tokens": "cp node_modules/@esposure/brand-tokens/css/brand-tokens.css assets/css/ && cp node_modules/@esposure/brand-tokens/css/brands/esposure4all.css assets/css/"
```
```html
<link rel="stylesheet" href="assets/css/brand-tokens.css" />
<link rel="stylesheet" href="assets/css/esposure4all.css" />
<link rel="stylesheet" href="assets/css/styles.css" />
```
Keep loading Poppins from Google Fonts in `index.html` (the overlay references the
family; it doesn't ship the font).

---

## Cleanup once all 4 are migrated

- Delete the now-dead `src/styles/MasterTheme.css` and `src/styles/themes/` from both
  React repos.
- Remove the duplicated brand assets (`esposure-logo-*.png`, `pathfinity-logo-*.png`,
  `companions/*`) from each site's `public/`/`assets/` and reference the package's
  `assets/` (React) or copy them in the `sync:tokens` step (static).
- Drop the `pathcte-website` → `pathfinity-website` `node_modules` symlink.

## Asset-size follow-up (optional)

`assets/companions/` is ~25 MB of PNGs, pulled on every `npm install`. If install
weight matters, convert to optimized `webp` or drop unused light/dark variants.
