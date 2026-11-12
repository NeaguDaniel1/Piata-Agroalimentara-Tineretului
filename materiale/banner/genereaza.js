// Generează PDF-ul de tipar (4200 × 1000 mm, 1:1) și o previzualizare PNG.
// Rulare: node materiale/banner/genereaza.js
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const dir = __dirname;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(dir, "banner.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  // Verificare: niciun text nu iese din zona lui
  const issues = await page.evaluate(() => {
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
  issues.forEach((i) => console.warn("ATENȚIE:", i));

  await page.pdf({
    path: path.join(dir, "banner-4200x1000mm.pdf"),
    width: "4200mm",
    height: "1000mm",
    printBackground: true,
    pageRanges: "1",
  });
  await browser.close();
  console.log("Gata: banner-4200x1000mm.pdf");
})();
