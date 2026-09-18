# Triangle 13 Black — 2027 sponsorship

A standalone Astro site for a parent-led, whole-team sponsorship proposal. Separate from BumpSetBook; no shared backend, credentials, or deployment.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:4321. `npm run build` runs Astro type checking and produces a static site in `dist/`. `npm run preview` serves that build. Use a supported even-numbered Node LTS for hosting (22.12+).

## Pages

- `/`: whole-team story, sourced club context, tournament filters, calendar download, season budget, proposed local and corporate sponsor packages, Netlify sponsorship form, and print styles.
- `/pitch/gametime`: a separate printable Gametime proposal, with a $5,000 starting ask, $2,500 option, and custom experience/matching ideas. Gametime is a prospective sponsor only.
- `/season.ics`: eight planned tournaments; intentionally excludes the backup qualifier and undecided championship. Dates are tentative all-day competition dates, with exclusive end dates.

## Content and contact

Edit `src/data/season.ts` for events, budget assumptions, and sponsor tiers. The static HTML form named `sponsorship` posts to Netlify Forms with the selected sponsorship level, name, business, email, and message. It uses a honeypot, browser validation, and `/thank-you/` confirmation. No payment is collected.

Enable form detection in the Netlify site's Forms settings before deploying. After deployment, confirm the `sponsorship` form is listed, send a controlled inquiry, and verify it in Netlify submissions. Configure email notifications there if desired. Local Astro does not provide Netlify's collection service; the browser test intercepts the POST to verify serialization and confirmation without sending a real inquiry. Live collection remains unverified until a Netlify site is deployed.

The page currently labels packages as proposals and uses noindex. Before public launch: finalize the parent contact, agreed team/club fundraising recipient and allocation, recognition permissions, and actual benefits. Replace proposal wording and remove noindex only after those facts are confirmed. The social image is included. Astro uses `SITE_URL` or Netlify’s `URL` for absolute sharing URLs; set SITE_URL if a custom canonical domain is needed. Team photography can be added when an approved photo is available; the current hero is original SVG/CSS artwork, not a representation of real players.

## Source facts

- [Triangle 2027 13s program guide](https://trianglevolleyball.org/wp-content/uploads/2026/09/13s-Girls-Program-Guide-2027.pdf), revised September 9, 2026, pages 2–6. Visually checked schedule column for 13 Black. 2026 preseason, 2027 tournaments. Dues $5,800 (11) or $6,400 (10), plus $380 full uniform estimate; travel extra. AAU OR qualified USAV, not both. Sunshine is backup only. First official 13 Black practice is Nov 8 per event table; weekly section uses general week-of-Nov-5 language.
- [Triangle alumni directory](https://trianglevolleyball.org/club-program/alumni/): college commitments, not assumed current enrollment or endorsement.
- [Gametime About](https://gametime.co/company/about/): basis for the shared-experience positioning; no claim about existing giving or matching policies.

Checked September 18, 2026. No roster identities, private practice details beyond the public guide, invented funds raised, sponsor logos, audience metrics, or promises of tax deductibility.

## Verification

With the dev server on port 4321:

```sh
node scripts/verify.mjs
```

Checks both pages at 320/390/768/1440px, event filters, fixed 10-player season budget and per-trip estimates, sponsor Netlify sponsorship form, keyboard dialog close, eight-event calendar, and browser errors. Screenshots go to ignored `artifacts/`. Run `npx playwright install chromium` if a browser is missing.

## Hosting

Static Astro: build command `npm run build`, output directory `dist`. No adapter or server required. netlify.toml sets the build and output folder and Node22. No deployment or external outreach has been performed.

## Travel budget — updated September 18, 2026

User requested 10 players and $1,500 in estimated food/travel per away trip. Six scheduled away tournaments plus one national championship = seven trips. Per athlete: $6,400 dues + $380 uniforms + $10,500 travel = $17,280. Team of10: $172,800. Backup Sunshine qualifier is labeled/excluded; local tournaments have no travel allowance. Estimate includes food, transportation, lodging; per trip, not per day. Shared SeasonBudget component keeps both pages aligned.

## Social preview

`public/social-share.png` is a 1730×909 PNG used in Open Graph and Twitter metadata on both pages. Generated with the built-in image generation tool, September18,2026. The final prompt is in `docs/social-image-prompt.md`. Netlify supplies the deployed site URL at build time. Preview the image directly at `/social-share.png`.

## Club logo

Official Triangle Volleyball logo copied unchanged from https://trianglevolleyball.org/wp-content/uploads/2024/04/TVB-rough.png for page headers and footers. Favicon copied from the official site’s https://trianglevolleyball.org/wp-content/uploads/2024/04/cropped-TVB-rough-32x32.png. User requested replacing custom badges with the real club logo on September18,2026. Parent-led proposal status remains.
