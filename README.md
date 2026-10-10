# valence-web

Static site for Valence. Next.js (App Router) with Tailwind v4, exported as plain HTML.

```bash
bun install
bun dev          # http://localhost:3000
bun run build    # writes the static site to out/
```

- `app/page.tsx`: all page content and markup.
- `app/globals.css`: color tokens (light and dark via `prefers-color-scheme`), breakpoints, the `flow` animation.
- `app/logo.tsx`: the V mark, traced from `logo.jpeg`. `app/icon.svg` is the favicon built from the same path.
- `template/index.html`: the original single-file design this was ported from.

## Notes

- Theme follows the OS setting only. The template's `data-theme` override was dropped because nothing on the page sets it.
- Founder photos live in `public/founders/`. Set `photo` and `photoFocus` on a founder in `app/page.tsx`. `photoFocus` is the `object-position` used when the portrait goes 16:10 on phones.
