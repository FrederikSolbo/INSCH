# insch.co rebuild

Vite + React + TypeScript, React Compiler friendly (no manual memoization anywhere).

## Install

```bash
npm i react-router-dom
```

Copy `index.html` and everything in `src/` over your project's versions.

## Images

All images are imported from `src/assets/`: `logo.png`, `ingvill.jpeg`, `coaching.png`,
`consultancy.png`, `norwayhouse.png`, and `hero.svg`. The build fails if any of them is missing.
That is deliberate.

`hero.svg` is a placeholder gradient, because the old insch.co site (and its cherry blossom
banner) is gone. To use a real photo, add it to `src/assets/` and change the `hero` import in
`src/content/site.tsx`.

`src/vite-env.d.ts` has to stay a `.d.ts` file. It is the only way to tell TypeScript what an
image import resolves to.

## Formspree

The endpoint lives in `site.formspree` in `src/content/site.tsx`. Both subpage forms post to it
with `Accept: application/json`, so visitors stay on the page and see a success or error message.

- The first submission triggers a confirmation email from Formspree. Nothing arrives until that
  is confirmed.
- Each message carries a `_subject` naming the page it came from.
- A hidden `_gotcha` field filters bots.
- In the Formspree dashboard, restrict allowed domains to your real domain once deployed.

## Routing on deploy

`BrowserRouter` needs unknown paths rewritten to `index.html`.
Netlify: add `public/_redirects` containing `/* /index.html 200`. Vercel works out of the box.
The old Weebly URLs `/wwwinschco.html` and `/business-consultancy.html` redirect to the new ones.

## Content

All copy is in `src/content/site.tsx`. Pages only render it.
