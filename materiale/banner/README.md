# Bannere Piața Tineretului — 4,2 m × 1 m

Toate fișierele `.pdf` sunt **fișierele de tipar**: vectoriale, la dimensiune reală 1:1 (4200 × 1000 mm).
Fișierele `-100dpi.jpg` sunt aceleași bannere ca imagine, la dimensiune reală — doar dacă tipografia cere JPG.

## 1. Banner „S-a deschis Piața Tineretului” (cu săgeată)
| Fișier | |
|---|---|
| `banner-deschidere-sageata-stanga-4200x1000mm.pdf` | Săgeata spre **stânga** |
| `banner-deschidere-sageata-dreapta-4200x1000mm.pdf` | Săgeata spre **dreapta** |
| `previzualizare-deschidere-sageata-*.png` | Doar pentru vizualizare / trimis pe WhatsApp |
| `banner-deschidere.html` | Sursa designului |

Alege varianta în care săgeata arată spre intrarea în piață, din locul unde se montează bannerul.

## 2. Banner cu program și adresă
| Fișier | |
|---|---|
| `banner-4200x1000mm.pdf` | Banner verde/alb cu numele pieței, programul și adresa |
| `previzualizare.png` | Doar pentru vizualizare |
| `banner.html` | Sursa designului |

Înainte de tipar, verifică **programul** (Luni–Vineri 06–20, Sâmbătă 06–18, Duminică 07–14) — e cel de pe site.

## De spus la tipografie
- Dimensiune finală: **4200 × 1000 mm**, fișier 1:1.
- Textele sunt departe de margine, deci se pot pune **capse** și **tiv** fără să atingă nimic.
- Culorile sunt în RGB; tipografia le convertește în CMYK.
- Material recomandat: **frontlit 440–510 g/m²** pentru exterior, cu tiv și capse la ~50 cm.

## Modificări
Textele, culorile și dimensiunile se schimbă în fișierele `.html`; apoi se refac PDF-urile cu
`node materiale/banner/genereaza.js`.
