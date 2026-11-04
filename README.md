# insch.co

One-page site. Vite + React + TypeScript, React Compiler friendly (no manual memoization anywhere).

```bash
npm install
npm run dev
```

## Structure

`src/App.tsx` stacks the page: header, hero, the four sections in `src/sections/`, footer and the
scroll line. All copy is in `src/content/site.tsx`; the sections only render it.

The header links and the "Get in touch" button jump to sections by id: `#welcome`, `#coaching`,
`#consultancy` and `#contact` (the contact form at the bottom).

## Scroll line

`src/components/ScrollLine.tsx` draws the hand-drawn ink line on a canvas behind the content. It
underlines each section title, runs down the page margin beside the section (alternating sides) and
turns under the next title. A title gets underlined while it scrolls up to the header, and the stroke
down the margin reaches the end of the section as the section's end reaches the bottom of the screen.

- Titles are found by their `data-line-title` attribute, which `src/components/Section.tsx` adds, so a
  new section built with `Section` joins the line by itself.
- Thickness, wobble, pen pressure, taper and timing are the settings at the top of the file.
- The line runs `--margin` in from the edges of the page frame, and content is inset by `--gutter` so
  text never touches it. Both are in `src/index.css`.
- With "reduce motion" switched on, the whole line is shown at once instead of being drawn.

## Images

All images are imported from `src/assets/`, so the build fails if any of them is missing. That is
deliberate. `coaching.png` and `consultancy.png` are no longer used, since they have the old page
titles baked in.

`src/vite-env.d.ts` has to stay a `.d.ts` file. It is the only way to tell TypeScript what an
image import resolves to.

## Formspree

The endpoint lives in `site.formspree` in `src/content/site.tsx`. The form posts to it with
`Accept: application/json`, so visitors stay on the page and see a success or error message.

- The first submission triggers a confirmation email from Formspree. Nothing arrives until that
  is confirmed.
- Messages arrive with the subject "New message from insch.co".
- A hidden `_gotcha` field filters bots.
- In the Formspree dashboard, restrict allowed domains to your real domain once deployed.

## Old URLs

`src/main.tsx` sends the old page URLs `/team-business-coaching` and `/business-consultancy`, and the
Weebly ones `/wwwinschco.html` and `/business-consultancy.html`, to the matching section. Any other
path goes to the top of the page. For this to work the host must serve `index.html` for unknown paths.
Netlify: add `public/_redirects` containing `/* /index.html 200`. Vercel works out of the box.
