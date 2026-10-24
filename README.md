# Piața Agroalimentară Tineretului — site de prezentare

Site modern, rapid și adaptat pentru telefon, fără dependențe (HTML + CSS + JavaScript simplu).

## Cum îl deschizi
Dublu-click pe `public/index.html` — se deschide în browser.

## Publicare pe Cloudflare Workers & Pages
Site-ul este static; tot ce se publică stă în folderul `public/`, iar configurarea e în `wrangler.jsonc`.

1. Intră pe [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**.
2. Alege **Import a repository** și conectează contul GitHub, apoi selectează
   `Piata-Agroalimentara-Tineretului`.
3. Setări:
   - **Project name:** `piata-agroalimentara-tineretului`
   - **Build command:** lasă gol
   - **Deploy command:** `npx wrangler deploy`
4. **Deploy**. Site-ul apare la `https://piata-agroalimentara-tineretului.<contul-tau>.workers.dev`.

De acum, fiecare modificare urcată pe GitHub (branch `master`) republică site-ul automat.
Un domeniu propriu (ex. `piatatineretului.ro`) se adaugă din proiect → **Settings → Domains & Routes**.

Din terminal (alternativ): `npx wrangler login`, apoi `npx wrangler deploy`.

## Secțiuni
- **Acasă (hero)** — poză mare, mesaj principal, cifre
- **Despre** — prezentarea pieței, avantaje
- **Produse** — 30 de produse, filtrare pe categorii și căutare (merge și fără diacritice: „rosii”)
- **Producători / branduri** — magazinele și firmele din interiorul pieței, cu stand și logo
- **Galerie foto** — grilă de poze cu vizualizare mare (săgeți, Esc, swipe pe telefon)
- **Program & locație** — program, „Deschis acum / Închis acum” calculat după ora României, hartă Google
- **Contact** — telefon, email, rețele sociale, formular (deschide aplicația de email)

## Cum modifici conținutul
Tot conținutul este în **`public/js/data.js`**: date de contact, program, produse, prețuri, branduri, galerie.
Editezi textul dintre ghilimele și salvezi.

> Brandurile, prețurile, adresa, telefonul și emailul din `public/js/data.js` sunt **exemple** —
> înlocuiește-le cu datele reale.

## Cum adaugi poze
Fiecare spațiu de poză afișează o etichetă 📷 până pui poza reală. Copiază pozele (JPG, ideal
lățime 1200–1600 px) cu **exact** numele de mai jos și apar automat:

| Unde | Fișier |
|---|---|
| Poza mare de sus | `public/images/galerie/hero.jpg` |
| Secțiunea „Despre” | `public/images/galerie/despre-1.jpg`, `public/images/galerie/despre-2.jpg` |
| Galerie | `public/images/galerie/galerie-1.jpg` … `galerie-9.jpg` |
| Produse | `public/images/produse/rosii.jpg`, `rosii-cherry.jpg` etc. (vezi câmpul `img` din `public/js/data.js`) |
| Logo-uri branduri | `public/images/branduri/...png` (vezi câmpul `logo`; fără logo se afișează inițialele) |

Poți adăuga oricâte produse, branduri sau poze în galerie copiind un rând existent din `public/js/data.js`.

## Culori și fonturi
Se schimbă din variabilele de la începutul fișierului `public/css/style.css` (`--green-800`, `--tomato` etc.).
