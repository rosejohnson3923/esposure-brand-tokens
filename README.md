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

### Pathfinity logo — FINAL art (2026-09-10)

The Pathfinity mark is a mortarboard whose tassel opens into an infinity loop (beaded-tassel
variant, as in the designer's presentation). Brand purple `#8b5cf6`. Source files (AI/EPS/PDF,
JPEG/PNG exports, social-media kit, the WHY8 Foundation set) stay in
`pathfinity-app/docs/Brand Logos/`; **these are the production slots every surface points at:**

| File | What | Use |
|---|---|---|
| `assets/logos/pathfinity-mark.svg` | the symbol, `fill="currentColor"` (698.49 × 349.85, ≈2:1) | inline in React/HTML where the colour should follow the theme |
| `assets/logos/pathfinity-mark-{purple,white,black}.svg` | the symbol, fixed colour | `<img>` tags (an `<img>` cannot recolour `currentColor`) |
| `assets/logos/pathfinity-lockup.svg` + `-{purple,white,black}` | symbol + PATHFINITY wordmark (outlined paths, no font) | sign-in pages, cards, documents |
| `assets/logos/pathfinity-favicon.svg` | square viewBox, **BLACK** mark, transparent, **no padding** (1.1.1 — the purple mark read as a thin strip on a light tab bar) | `<link rel="icon" type="image/svg+xml">` |
| `assets/logos/pathfinity-favicon-{32,192,512}.png` · `pathfinity-apple-touch-180.png` | raster favicons cut from the designer's 6× black PNG (apple-touch is opaque white) | PNG icon links, PWA manifests |
| `assets/logos/pathfinity-favicon-purple*.{svg,png}` · `pathfinity-apple-touch-purple-180.png` | the 1.1.0 purple set, kept for a dark tab bar if ever wanted | — |

**The art is not square.** Size by height and let width follow (`h-10 w-auto`); a square box
letterboxes it. The React surfaces (`pathfinity-website`, `pathfinity-platform/apps/pathfinity`)
carry an inline `BrandMark.tsx` generated from `pathfinity-mark.svg` / `pathfinity-lockup.svg`
(props `variant` · `tone` · `product`); regenerate both copies together when the art changes.
PathCTE wears the SAME mark (founder ruling 2026-09-11): the symbol alone beside the product name set in text — there is no separate PathCTE tile; the interim `pathcte-brandmark.svg` "P" tile was retired in 1.1.2.
The temporary `pathfinity-logo-metallic-dark.png` placeholder was removed in 1.1.0.


`assets/logos/` and `assets/companions/` hold the brand artwork that was
previously duplicated across all four repos. Reference via the package
(`@esposure/brand-tokens/assets/logos/...` in React) or copy alongside the CSS
in the static `sync:tokens` step.

## Updating tokens

Edit `css/brand-tokens.css` (and keep `tokens/index.js` in sync by hand — there is
no build step, which is what lets this install as a plain git dependency with no
`prepare`). Bump `version`, commit, push. React sites pick it up on the next
`npm install`; static sites on their next build (the `sync:tokens` copy).
