# Soo Jian Lin — Portfolio

New editorial portfolio built using the factual content and media in https://github.com/Jens0343/Portfolio at commit 81a0c7062b232a166a45aaaab5ab712a02040f8b.

The complete deployable site is in `dist/`. Run `node server.cjs` for a local preview. No build step is required. Project details use native accessible disclosure controls; the contact area supports email and clipboard copying. Respects reduced-motion preferences and supports narrow screens.

The site presents Jian Lin as an incoming SAP Intern at PPG for a one-year internship, based on his supplied update. The contact section invites professional connections rather than internship offers. No start date or SAP responsibilities have been invented.

The original color profile and Tonight screenshot are used. The older résumé and application video are excluded from the published files; local copies and earlier source history are retained. The approximate booking improvement is explicitly attributed to the original portfolio. Fonts use Google Fonts with system fallbacks. The original GitHub repository has not been modified.


## GitHub Pages

The GitHub Actions workflow in `.github/workflows/pages.yml` validates and deploys `dist/` on pushes to `main`. Enable GitHub Pages with GitHub Actions as its source after repository visibility permits Pages.

## Scroll interaction

The three-chapter introduction uses scroll-controlled full-screen circular color transitions. Scrolling moves the headline and portrait and shifts the selected-work background. Hovering, focusing, or expanding project rows changes the background palette. Pointer movement tilts imagery. Reduced-motion users receive a static, readable layout.
