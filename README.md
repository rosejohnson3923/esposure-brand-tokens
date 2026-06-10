# @esposure/brand-tokens

Canonical design tokens and shared brand assets for the **Esposure web portfolio**:

| Site | Stack | Consumes |
|---|---|---|
| pathfinity.ai (`pathfinity-website`) | React + Vite | `@esposure/brand-tokens/css` + brand defaults |
| pathcte.com (`pathcte-website`) | React + Vite | `@esposure/brand-tokens/css` + brand defaults |
| esposure.gg (`esposure-website`) | static HTML | copied `brand-tokens.css` + `css/brands/esposure.css` |
| esposure4all.org (`esposure4all-website`) | static HTML | copied `brand-tokens.css` + `css/brands/esposure4all.css` |

One source of truth for colors, gradients, shadows, spacing, typography, radii,
z-index, blur primitives, **glassmorphism** (`--glass-*`), and component tokens.

## Layering

```
core            palette · spacing · shadows · radii · typography · blur · z-index
theme           light (default) + dark (:root[data-theme="dark"]) — incl. --glass-*
brand overlay   css/brands/<brand>.css — re-tints accent + --glass-border
```

`css/brand-tokens.css` is **self-contained** (no `@import`) so a static-HTML site
can use it with a single `<link>`. It is a strict **superset** of the old
per-repo `MasterTheme.css` (core) plus the `themes/{light,dark}.css` glass layer,
so swapping a site onto it is a no-visual-regression change.

> **Glassmorphism note.** `--glass-bg/border/shadow` + the `.glass-effect` utility
> are included as a first-class theme group. On the current marketing sites these
> tokens were defined-but-unwired (the live glass came from inline Tailwind
> utilities), so adopting this package adds them without changing rendering.
> `--glass-border` is the brand accent at low alpha; brand overlays re-tint it.

## Consume — React / Vite (pathfinity-website, pathcte-website)

`package.json`:
```jsonc
"dependencies": {
  "@esposure/brand-tokens": "github:rosejohnson3923/esposure-brand-tokens"
}
```

Import the CSS once at the app entry (replaces the local `MasterTheme.css` import):
```ts
import '@esposure/brand-tokens/css';
```

Optional typed values in JS:
```ts
import tokens, { colors, glass } from '@esposure/brand-tokens';
const purple = colors.primary;        // '#8b5cf6'
const card = glass.light;             // { bg, border, shadow, blur }
```

## Consume — static HTML (esposure-website, esposure4all-website)

Static sites can't `import`, so add a tiny copy step that pulls the CSS out of
`node_modules` into the site's assets at build time.

`package.json`:
```jsonc
"dependencies": {
  "@esposure/brand-tokens": "github:rosejohnson3923/esposure-brand-tokens"
},
"scripts": {
  "build": "npm i && npm run sync:tokens",
  "sync:tokens": "cp node_modules/@esposure/brand-tokens/css/brand-tokens.css assets/css/ && cp node_modules/@esposure/brand-tokens/css/brands/esposure4all.css assets/css/"
}
```

`index.html` — load tokens first, then the brand overlay, then site styles:
```html
<link rel="stylesheet" href="assets/css/brand-tokens.css" />
<link rel="stylesheet" href="assets/css/esposure4all.css" /> <!-- brand overlay -->
<link rel="stylesheet" href="assets/css/styles.css" />        <!-- site overrides -->
```
(esposure.gg uses `css/brands/esposure.css` instead of the e4a overlay.)

## Shared assets

`assets/logos/` and `assets/companions/` hold the brand artwork that was
previously duplicated across all four repos. Reference via the package
(`@esposure/brand-tokens/assets/logos/...` in React) or copy alongside the CSS
in the static `sync:tokens` step.

## Updating tokens

Edit `css/brand-tokens.css` (and keep `tokens/index.js` in sync by hand — there is
no build step, which is what lets this install as a plain git dependency with no
`prepare`). Bump `version`, commit, push. React sites pick it up on the next
`npm install`; static sites on their next build (the `sync:tokens` copy).
