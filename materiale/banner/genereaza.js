// Generează PDF-urile de tipar (4200 × 1000 mm, 1:1).
// Rulare: node materiale/banner/genereaza.js
const path = require("path");
const { chromium } = require("playwright");

const dir = __dirname;
const lucrari = [
  { sursa: "banner.html", pdf: "banner-4200x1000mm.pdf", verificaMargini: true },
  { sursa: "banner-deschidere.html", pdf: "banner-deschidere-sageata-stanga-4200x1000mm.pdf", asteapta: true },
  { sursa: "banner-deschidere.html?sageata=dreapta", pdf: "banner-deschidere-sageata-dreapta-4200x1000mm.pdf", asteapta: true },
];

// Verificare: textele stau la cel puțin 80 mm de marginea zonei lor (pentru tiv și capse)
async function verificaMargini(page) {
  return page.evaluate(() => {
    const out = [];
    const mm = 96 / 25.4;
    const check = (sel, container) => {
      const el = document.querySelector(sel);
      const r = document.createRange(); r.selectNodeContents(el);
      const a = r.getBoundingClientRect(); // marginile textului efectiv, nu ale blocului
      const c = document.querySelector(container).getBoundingClientRect();
      if (a.right > c.right - 80 * mm || a.left < c.left + 80 * mm || a.bottom > c.bottom - 80 * mm || a.top < c.top + 80 * mm)
        out.push(sel + " e prea aproape de margine: " + JSON.stringify({ right: (c.right - a.right) / mm, left: (a.left - c.left) / mm, bottom: (c.bottom - a.bottom) / mm, top: (a.top - c.top) / mm }));
    };
    [".brand", ".name", ".cats"].forEach((s) => check(s, ".left"));
    [".right h2", ".hours", ".address"].forEach((s) => check(s, ".right"));
    return out;
  });
}

(async () => {
  const browser = await chromium.launch();
  for (const l of lucrari) {
    const page = await browser.newPage();
    await page.goto("file://" + path.join(dir, l.sursa), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    if (l.asteapta) await page.waitForFunction(() => window.__gata === true);
    if (l.verificaMargini) (await verificaMargini(page)).forEach((i) => console.warn("ATENȚIE:", i));
    await page.pdf({ path: path.join(dir, l.pdf), width: "4200mm", height: "1000mm", printBackground: true, pageRanges: "1" });
    await page.close();
    console.log("Gata:", l.pdf);
  }
  await browser.close();
})();
