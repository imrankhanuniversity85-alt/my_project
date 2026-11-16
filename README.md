# Basit & Nazia — Wedding Invitation Website

A responsive, single-page Pakistani Muslim wedding invitation website built with HTML5, CSS3 and vanilla JavaScript.

## Run locally
1. Extract the ZIP archive.
2. Open `index.html` in a modern browser.
3. For best results with the native share feature, run the folder from a local web server (for example, VS Code Live Server or `python -m http.server 8000`) because some browsers restrict file sharing/fetch access from `file://`.

## Included features
- Four complete themes: Royal Burgundy, Sage Garden, Midnight Gold and Rose Champagne. The selected theme is saved in browser local storage.
- Groom and bride supplied portraits in the hero.
- Live countdown to 29 November 2026 at 11:00 AM Pakistan Standard Time.
- Event details and supplied Iqbal Marriage Hall photograph.
- Dedicated original wedding invitation card section. The supplied image is included unchanged, displayed without cropping, with full-size lightbox, download, native share/fallback and WhatsApp sharing.
- Scratch-to-reveal message supporting mouse, touch and stylus.
- WhatsApp contact and exact Google Maps link.
- Reduced-motion support and responsive mobile/tablet/desktop layout.

## Project structure
```text
basit_nazia_wedding_invitation/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── bride.jpeg
    ├── groom.jpeg
    ├── invitation-card.jpeg
    └── marriage-hall.jpg
```

## Wedding details used
- Groom: Advocate Abdul Basit Umrani
- Bride: Nazia Gul Muhammad
- Host: Mr. Mir Muhammad Umrani
- Bride's father: Gul Muhammad Umrani
- Date: Sunday, 29 November 2026
- Gathering: 11:00 AM
- Lunch: 12:00 PM
- Venue: Iqbal Marriage Hall, Chamber Road Bypass, Tando Allahyar, Sindh, Pakistan
- WhatsApp: +92 319 2933924
- Maps: https://maps.app.goo.gl/6tXa72SJb3uBd3ew8

## Editing content
- Update the visible copy and event details in `index.html`.
- Replace photos in `assets/` and update the corresponding `src` paths in `index.html` if filenames change.
- Edit colours in the theme variable blocks at the top of `style.css`.
- Edit the event date in `script.js` in the `weddingDate` constant. Keep the `+05:00` offset for Pakistan Standard Time.
- Update the WhatsApp number and Google Maps URL in `index.html` / `script.js` if the contact or venue changes.

## Notes
- WhatsApp links open WhatsApp with a prefilled message; the visitor must press Send.
- Browser share support varies by device and browser. The share button falls back to copying the invitation message and card link.
- Google Fonts are loaded online; system serif/sans-serif fallbacks are provided.
