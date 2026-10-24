/* =====================================================================
   CONȚINUTUL SITE-ULUI — editează aici textele, produsele, brandurile
   și pozele. Nu e nevoie să modifici alte fișiere.

   POZE: pune fișierele în folderul indicat (ex. images/produse/rosii.jpg).
   Dacă o poză lipsește, site-ul afișează automat un spațiu colorat
   cu emoji, până când adaugi poza reală.
   ===================================================================== */

window.SITE = {
  contact: {
    phone: "+40 700 000 000",
    email: "contact@piatatineretului.ro",
    address: "Piața Agroalimentară Tineretului, Sector 4, București",
    transport: "Metrou M2 — stația Tineretului (5 min. pe jos). Tramvai și autobuz în apropiere.",
    parking: "Parcare proprie gratuită pentru clienți, 2 ore.",
    // Textul folosit pentru căutarea pe Google Maps
    mapQuery: "Piata Tineretului, Bucuresti",
    socials: [
      { name: "Facebook", url: "https://facebook.com/" },
      { name: "Instagram", url: "https://instagram.com/" },
      { name: "TikTok", url: "https://tiktok.com/" }
    ]
  },

  // Program: 0 = Duminică, 1 = Luni, ... 6 = Sâmbătă. null = închis.
  hours: [
    { day: 1, label: "Luni",     open: "06:00", close: "20:00" },
    { day: 2, label: "Marți",    open: "06:00", close: "20:00" },
    { day: 3, label: "Miercuri", open: "06:00", close: "20:00" },
    { day: 4, label: "Joi",      open: "06:00", close: "20:00" },
    { day: 5, label: "Vineri",   open: "06:00", close: "20:00" },
    { day: 6, label: "Sâmbătă",  open: "06:00", close: "18:00" },
    { day: 0, label: "Duminică", open: "07:00", close: "14:00" }
  ],

  categories: [
    { id: "toate",   label: "Toate",            emoji: "🧺" },
    { id: "legume",  label: "Legume",           emoji: "🥕" },
    { id: "fructe",  label: "Fructe",           emoji: "🍎" },
    { id: "lactate", label: "Lactate & ouă",    emoji: "🧀" },
    { id: "carne",   label: "Carne & pește",    emoji: "🥩" },
    { id: "brutarie",label: "Brutărie",         emoji: "🥖" },
    { id: "camara",  label: "Miere & cămară",   emoji: "🍯" },
    { id: "flori",   label: "Flori & plante",   emoji: "💐" }
  ],

  // badge: "Local", "Bio", "De sezon", "Tradițional", "Nou" (sau lasă gol)
  products: [
    { name: "Roșii de grădină",      cat: "legume",  price: "8 lei/kg",    producer: "Grădina lui Matei",   emoji: "🍅", badge: "De sezon",   img: "images/produse/rosii.jpg" },
    { name: "Roșii cherry",          cat: "legume",  price: "14 lei/kg",   producer: "Grădina lui Matei",   emoji: "🍅", badge: "Local",      img: "images/produse/rosii-cherry.jpg" },
    { name: "Roșii inimă de bou",    cat: "legume",  price: "12 lei/kg",   producer: "Ferma Valea Verde",   emoji: "🍅", badge: "Tradițional",img: "images/produse/rosii-inima-de-bou.jpg" },
    { name: "Castraveți cornișon",   cat: "legume",  price: "9 lei/kg",    producer: "Ferma Valea Verde",   emoji: "🥒", badge: "",           img: "images/produse/castraveti.jpg" },
    { name: "Ardei kapia",           cat: "legume",  price: "10 lei/kg",   producer: "Grădina lui Matei",   emoji: "🫑", badge: "De sezon",   img: "images/produse/ardei-kapia.jpg" },
    { name: "Vinete",                cat: "legume",  price: "7 lei/kg",    producer: "Ferma Valea Verde",   emoji: "🍆", badge: "",           img: "images/produse/vinete.jpg" },
    { name: "Cartofi noi",           cat: "legume",  price: "4 lei/kg",    producer: "Ferma Covasna",       emoji: "🥔", badge: "Local",      img: "images/produse/cartofi.jpg" },
    { name: "Ceapă roșie",           cat: "legume",  price: "5 lei/kg",    producer: "Ferma Covasna",       emoji: "🧅", badge: "",           img: "images/produse/ceapa.jpg" },
    { name: "Salată verde",          cat: "legume",  price: "3 lei/buc",   producer: "Grădina lui Matei",   emoji: "🥬", badge: "Bio",        img: "images/produse/salata.jpg" },

    { name: "Mere Ionatan",          cat: "fructe",  price: "6 lei/kg",    producer: "Livada Bunicului",    emoji: "🍎", badge: "Local",      img: "images/produse/mere.jpg" },
    { name: "Pere",                  cat: "fructe",  price: "9 lei/kg",    producer: "Livada Bunicului",    emoji: "🍐", badge: "",           img: "images/produse/pere.jpg" },
    { name: "Struguri de masă",      cat: "fructe",  price: "11 lei/kg",   producer: "Podgoria Dealu Mare", emoji: "🍇", badge: "De sezon",   img: "images/produse/struguri.jpg" },
    { name: "Prune",                 cat: "fructe",  price: "7 lei/kg",    producer: "Livada Bunicului",    emoji: "🫐", badge: "",           img: "images/produse/prune.jpg" },
    { name: "Pepene verde",          cat: "fructe",  price: "3 lei/kg",    producer: "Ferma Dăbuleni",      emoji: "🍉", badge: "De sezon",   img: "images/produse/pepene.jpg" },

    { name: "Brânză de burduf",      cat: "lactate", price: "55 lei/kg",   producer: "Stâna din Deal",      emoji: "🧀", badge: "Tradițional",img: "images/produse/branza-burduf.jpg" },
    { name: "Telemea de oaie",       cat: "lactate", price: "40 lei/kg",   producer: "Stâna din Deal",      emoji: "🧀", badge: "Local",      img: "images/produse/telemea.jpg" },
    { name: "Smântână de casă",      cat: "lactate", price: "18 lei/borcan",producer: "Lăptăria Bunica",    emoji: "🥛", badge: "",           img: "images/produse/smantana.jpg" },
    { name: "Ouă de țară",           cat: "lactate", price: "1,5 lei/buc", producer: "Ferma Covasna",       emoji: "🥚", badge: "Bio",        img: "images/produse/oua.jpg" },

    { name: "Cârnați de casă",       cat: "carne",   price: "45 lei/kg",   producer: "Măcelăria Tradiția",  emoji: "🌭", badge: "Tradițional",img: "images/produse/carnati.jpg" },
    { name: "Ceafă de porc",         cat: "carne",   price: "32 lei/kg",   producer: "Măcelăria Tradiția",  emoji: "🥩", badge: "",           img: "images/produse/ceafa.jpg" },
    { name: "Pui de curte",          cat: "carne",   price: "28 lei/kg",   producer: "Ferma Covasna",       emoji: "🍗", badge: "Local",      img: "images/produse/pui.jpg" },
    { name: "Crap & șalău proaspăt", cat: "carne",   price: "de la 25 lei/kg", producer: "Pescăria Delta",  emoji: "🐟", badge: "",           img: "images/produse/peste.jpg" },

    { name: "Pâine pe vatră",        cat: "brutarie",price: "9 lei/buc",   producer: "Brutăria Spic de Aur",emoji: "🍞", badge: "Nou",        img: "images/produse/paine.jpg" },
    { name: "Cozonac cu nucă",       cat: "brutarie",price: "35 lei/buc",  producer: "Brutăria Spic de Aur",emoji: "🥮", badge: "Tradițional",img: "images/produse/cozonac.jpg" },
    { name: "Covrigi calzi",         cat: "brutarie",price: "2 lei/buc",   producer: "Brutăria Spic de Aur",emoji: "🥨", badge: "",           img: "images/produse/covrigi.jpg" },

    { name: "Miere de salcâm",       cat: "camara",  price: "40 lei/kg",   producer: "Stupina Albina Harnică", emoji: "🍯", badge: "Bio",     img: "images/produse/miere.jpg" },
    { name: "Zacuscă de casă",       cat: "camara",  price: "20 lei/borcan",producer: "Cămara cu Bunătăți", emoji: "🫙", badge: "Tradițional",img: "images/produse/zacusca.jpg" },
    { name: "Dulceață de prune",     cat: "camara",  price: "18 lei/borcan",producer: "Cămara cu Bunătăți", emoji: "🍓", badge: "",           img: "images/produse/dulceata.jpg" },

    { name: "Buchete de sezon",      cat: "flori",   price: "de la 30 lei", producer: "Florăria Petale",    emoji: "💐", badge: "",           img: "images/produse/flori.jpg" },
    { name: "Răsaduri & aromatice",  cat: "flori",   price: "de la 5 lei",  producer: "Florăria Petale",    emoji: "🌿", badge: "Nou",        img: "images/produse/rasaduri.jpg" }
  ],

  // Brandurile / magazinele din interiorul pieței.
  // logo: calea către logo (opțional). Dacă lipsește, se afișează inițialele.
  brands: [
    { name: "Grădina lui Matei",      type: "Legume de grădină",      stand: "Stand A1–A4", color: "#c8372d", desc: "Roșii, ardei și verdețuri culese în aceeași dimineață.",         logo: "images/branduri/gradina-lui-matei.png" },
    { name: "Stâna din Deal",         type: "Brânzeturi tradiționale",stand: "Hala B, 12",  color: "#d9a441", desc: "Brânză de burduf, telemea și caș, direct de la stână.",          logo: "images/branduri/stana-din-deal.png" },
    { name: "Măcelăria Tradiția",     type: "Măcelărie",              stand: "Hala C, 3",   color: "#8c2f39", desc: "Carne proaspătă și preparate afumate după rețete vechi.",       logo: "images/branduri/macelaria-traditia.png" },
    { name: "Brutăria Spic de Aur",   type: "Brutărie artizanală",    stand: "Intrare principală", color: "#b9772f", desc: "Pâine cu maia, cozonaci și covrigi calzi toată ziua.",   logo: "images/branduri/spic-de-aur.png" },
    { name: "Livada Bunicului",       type: "Fructe din livadă",      stand: "Stand D2",    color: "#4f8a3a", desc: "Mere, pere și prune din livezi de familie.",                    logo: "images/branduri/livada-bunicului.png" },
    { name: "Stupina Albina Harnică", type: "Apicultură",             stand: "Stand E5",    color: "#e0a526", desc: "Miere crudă, polen, propolis și fagure.",                       logo: "images/branduri/albina-harnica.png" },
    { name: "Lăptăria Bunica",        type: "Lactate",                stand: "Hala B, 4",   color: "#5b8fb9", desc: "Lapte, iaurt și smântână de casă, în borcane de sticlă.",       logo: "images/branduri/laptaria-bunica.png" },
    { name: "Pescăria Delta",         type: "Pește proaspăt",         stand: "Hala C, 9",   color: "#2f6f8c", desc: "Pește din Deltă, adus de trei ori pe săptămână.",               logo: "images/branduri/pescaria-delta.png" },
    { name: "Cămara cu Bunătăți",     type: "Conserve de casă",       stand: "Stand E2",    color: "#9c5a2b", desc: "Zacuscă, dulcețuri, murături și siropuri naturale.",            logo: "images/branduri/camara.png" },
    { name: "Florăria Petale",        type: "Flori & plante",         stand: "Stand F1",    color: "#c2577e", desc: "Buchete, răsaduri și plante aromatice pentru balcon.",          logo: "images/branduri/floraria-petale.png" },
    { name: "Ferma Valea Verde",      type: "Legume în solar",        stand: "Stand A7",    color: "#2e7d4f", desc: "Legume crescute în solarii, disponibile tot anul.",             logo: "images/branduri/valea-verde.png" },
    { name: "Cafeneaua din Piață",    type: "Cafenea",                stand: "Etaj, zona de relaxare", color: "#5a3e2b", desc: "Cafea de specialitate și patiserie, cu vedere spre hală.", logo: "images/branduri/cafeneaua.png" }
  ],

  // Galerie foto. size: "wide", "tall" sau "" (normal)
  gallery: [
    { img: "images/galerie/galerie-1.jpg", caption: "Tarabele cu legume dimineața",  emoji: "🥕", size: "wide" },
    { img: "images/galerie/galerie-2.jpg", caption: "Roșii proaspete de grădină",    emoji: "🍅", size: "tall" },
    { img: "images/galerie/galerie-3.jpg", caption: "Hala de lactate",               emoji: "🧀", size: "" },
    { img: "images/galerie/galerie-4.jpg", caption: "Fructe de sezon",               emoji: "🍇", size: "" },
    { img: "images/galerie/galerie-5.jpg", caption: "Brutăria artizanală",           emoji: "🥖", size: "tall" },
    { img: "images/galerie/galerie-6.jpg", caption: "Producătorii noștri",           emoji: "👨‍🌾", size: "" },
    { img: "images/galerie/galerie-7.jpg", caption: "Standul de miere",              emoji: "🍯", size: "" },
    { img: "images/galerie/galerie-8.jpg", caption: "Florăria din piață",            emoji: "💐", size: "wide" },
    { img: "images/galerie/galerie-9.jpg", caption: "Piața văzută de sus",           emoji: "🏪", size: "" }
  ]
};
