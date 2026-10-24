# Piața Agroalimentară Tineretului — site de prezentare

Site modern, rapid și adaptat pentru telefon, fără dependențe (HTML + CSS + JavaScript simplu).

## Cum îl deschizi
Dublu-click pe `index.html` — se deschide în browser. Pentru publicare poate fi urcat pe orice
hosting static (GitHub Pages, Netlify, Vercel, cPanel etc.).

## Secțiuni
- **Acasă (hero)** — poză mare, mesaj principal, cifre
- **Despre** — prezentarea pieței, avantaje
- **Produse** — 30 de produse, filtrare pe categorii și căutare (merge și fără diacritice: „rosii”)
- **Producători / branduri** — magazinele și firmele din interiorul pieței, cu stand și logo
- **Galerie foto** — grilă de poze cu vizualizare mare (săgeți, Esc, swipe pe telefon)
- **Program & locație** — program, „Deschis acum / Închis acum” calculat după ora României, hartă Google
- **Contact** — telefon, email, rețele sociale, formular (deschide aplicația de email)

## Cum modifici conținutul
Tot conținutul este în **`js/data.js`**: date de contact, program, produse, prețuri, branduri, galerie.
Editezi textul dintre ghilimele și salvezi.

> Brandurile, prețurile, adresa, telefonul și emailul din `js/data.js` sunt **exemple** —
> înlocuiește-le cu datele reale.

## Cum adaugi poze
Fiecare spațiu de poză afișează o etichetă 📷 până pui poza reală. Copiază pozele (JPG, ideal
lățime 1200–1600 px) cu **exact** numele de mai jos și apar automat:

| Unde | Fișier |
|---|---|
| Poza mare de sus | `images/galerie/hero.jpg` |
| Secțiunea „Despre” | `images/galerie/despre-1.jpg`, `images/galerie/despre-2.jpg` |
| Galerie | `images/galerie/galerie-1.jpg` … `galerie-9.jpg` |
| Produse | `images/produse/rosii.jpg`, `rosii-cherry.jpg` etc. (vezi câmpul `img` din `js/data.js`) |
| Logo-uri branduri | `images/branduri/...png` (vezi câmpul `logo`; fără logo se afișează inițialele) |

Poți adăuga oricâte produse, branduri sau poze în galerie copiind un rând existent din `js/data.js`.

## Culori și fonturi
Se schimbă din variabilele de la începutul fișierului `css/style.css` (`--green-800`, `--tomato` etc.).
