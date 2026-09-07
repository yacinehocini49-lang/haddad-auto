/* =========================================================
   HADDAD AUTO BEJAÏA — script.js
   Toutes les informations importantes sont centralisées ici.
   Pour ajouter / modifier / supprimer un véhicule, éditez
   simplement le tableau VEHICLES ci-dessous.
   ========================================================= */

const dealership = {
  name: "HADDAD AUTO BEJAÏA",
  phone: "0553021122",                // Téléphone 1
  phone2: "0540022441",               // Téléphone 2
  phoneIntl: "+213553021122",
  phone2Intl: "+213540022441",
  phoneFr: "+33745585978",            // Téléphone France
  whatsapp: "213553021122",           // WhatsApp (format international sans +)
  address: "Sidi Ahmed, Béjaïa, Algérie",
  hours: "[HORAIRES — à compléter]",
  city: "Béjaïa",
  country: "Algérie",
  mapQuery: "Haddad Auto Béjaïa, Algérie"
};

/* -------------------------------------------------------------
   VÉHICULES
   Renseignez les champs connus. Laissez null ou "" pour afficher
   "Sur demande". Supprimez un bloc pour retirer un véhicule.
   image : chemin vers le fichier dans le dossier images/
   disponibilite : "available" | "order" | "demand"
   ------------------------------------------------------------- */
const VEHICLES = [
  {
    brand: "Geely",
    model: "Coolray Full Option",
    year: null,
    fuel: null,
    gearbox: null,
    mileage: null,
    price: null,
    availability: "available",
    image: "images/geely-coolray.jpg",
    alt: "Geely Coolray Full Option grise métallisée — Haddad Auto Béjaïa"
  },
  {
    brand: "Livan",
    model: "X3 Pro",
    year: null,
    fuel: null,
    gearbox: null,
    mileage: null,
    price: null,
    availability: "available",
    image: "images/livan-x3-pro.jpg",
    alt: "Livan X3 Pro grise sous housse premium en showroom — Haddad Auto Béjaïa"
  },
  {
    brand: "Volkswagen",
    model: "Golf 8 R-Line",
    year: null,
    fuel: null,
    gearbox: null,
    mileage: null,
    price: null,
    availability: "available",
    image: "images/vw-golf-8-rline.jpg",
    alt: "Volkswagen Golf 8 R-Line bleue — Haddad Auto Béjaïa"
  },
  {
    brand: "Audi",
    model: "Q3",
    year: null,
    fuel: null,
    gearbox: null,
    mileage: null,
    price: null,
    availability: "available",
    image: "images/audi-q3.jpg",
    alt: "Audi Q3 bleue SUV compacte — Haddad Auto Béjaïa"
  },
  {
    brand: "Kia",
    model: "Seltos",
    year: null,
    fuel: null,
    gearbox: null,
    mileage: null,
    price: null,
    availability: "available",
    image: "images/kia-seltos.jpg",
    alt: "Kia Seltos blanche SUV — Haddad Auto Béjaïa"
  },
  {
    brand: "Kia",
    model: "Sonet",
    year: null,
    fuel: null,
    gearbox: null,
    mileage: null,
    price: null,
    availability: "demand",
    image: null,
    alt: "Kia Sonet — photo sur demande chez Haddad Auto Béjaïa"
  },
  {
    brand: "Suzuki",
    model: "Swift",
    year: null,
    fuel: null,
    gearbox: null,
    mileage: null,
    price: null,
    availability: "available",
    image: "images/suzuki-swift.jpg",
    alt: "Suzuki Swift grise sportive — Haddad Auto Béjaïa"
  }
];

/* ================= Helpers ================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const ON_DEMAND = "Sur demande";

const specIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>';
const specIconFuel = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21V6a2 2 0 012-2h6a2 2 0 012 2v15M3 21h14M15 9h2a2 2 0 012 2v6a1.5 1.5 0 003 0V9.5L20 7"/></svg>';
const specIconGear = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 6h8M6 8v8M18 8v8M8 18h8"/></svg>';
const specIconKm = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 110-18 9 9 0 010 18z"/><path d="M12 12l4-4M7 15l1.5 1.5M17 15l-1.5 1.5"/></svg>';
const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.4 2.1L8.1 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z"/></svg>';
const pinIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/></svg>';
const clockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>';
const waIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1121 11.5z"/></svg>';

function formatPhone(num) {
  return num.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

function waLink(message) {
  return `https://wa.me/${dealership.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ================= Rendu des véhicules ================= */
const BADGES = {
  available: '<span class="vehicle-badge badge-available">Disponible</span>',
  order: '<span class="vehicle-badge badge-order">Sur commande</span>',
  demand: '<span class="vehicle-badge badge-demand">Sur demande</span>'
};

function specRow(icon, label, value) {
  const v = value ? `<b>${value}</b>` : `<b>${ON_DEMAND}</b>`;
  return `<div>${icon}<span>${label} : ${v}</span></div>`;
}

function renderVehicles() {
  const grid = $("#vehiclesGrid");
  grid.innerHTML = VEHICLES.map((v, i) => {
    const media = v.image
      ? `<img src="${v.image}" alt="${v.alt}" loading="lazy">`
      : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#9a9aa0;font-weight:700;padding:1rem;text-align:center;background:#1d1d20;">Photo sur demande</div>`;
    const price = v.price ? `${v.price.toLocaleString("fr-FR")} DA` : ON_DEMAND;
    const waMsg = `Bonjour, je suis intéressé par le véhicule ${v.brand} ${v.model} (${dealership.name}).`;
    return `
    <article class="vehicle-card reveal" style="transition-delay:${(i % 3) * 90}ms">
      <div class="vehicle-media">
        ${BADGES[v.availability] || ""}
        ${media}
      </div>
      <div class="vehicle-body">
        <p class="vehicle-brand">${v.brand}</p>
        <h3 class="vehicle-model">${v.model}</h3>
        <div class="vehicle-specs">
          ${specRow(specIcon, "Année", v.year)}
          ${specRow(specIconFuel, "Carburant", v.fuel)}
          ${specRow(specIconGear, "Boîte", v.gearbox)}
          ${specRow(specIconKm, "Kilométrage", v.mileage)}
        </div>
        <p class="vehicle-price">${price} ${v.price ? '<small>DA</small>' : ''}</p>
        <div class="vehicle-actions">
          <a href="${waLink(waMsg)}" target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp</a>
          <a href="tel:${dealership.phoneIntl}" class="btn btn-ghost">Détails</a>
        </div>
      </div>
    </article>`;
  }).join("");
}

/* ================= Rendu du contact ================= */
function contactCard(icon, title, value, href, extraTag) {
  return `
    <div class="contact-card reveal">
      <div class="contact-icon">${icon}</div>
      <h3>${title}</h3>
      <a class="value" href="${href}">${value}</a>
      ${extraTag || ""}
    </div>`;
}

function renderContact() {
  const grid = $("#contactGrid");
  grid.innerHTML =
    contactCard(phoneIcon, "Téléphone 1", formatPhone(dealership.phone), `tel:${dealership.phoneIntl}`) +
    contactCard(phoneIcon, "Téléphone 2", formatPhone(dealership.phone2), `tel:${dealership.phone2Intl}`) +
    contactCard(waIcon, "WhatsApp", formatPhone(dealership.phone), waLink(`Bonjour, je vous contacte depuis le site de ${dealership.name}.`), '<span class="tag tag-wa">Réponse rapide</span>') +
    contactCard(phoneIcon, "Depuis la France", dealership.phoneFr, `tel:${dealership.phoneFr}`, '<span class="tag tag-fr">International</span>') +
    contactCard(pinIcon, "Adresse", dealership.address, "#localisation") +
    contactCard(clockIcon, "Horaires", dealership.hours, "#contact");
}

/* ================= Localisation ================= */
function renderMap() {
  $("#mapAddress").textContent = dealership.address;
  const q = encodeURIComponent(dealership.mapQuery);
  $("#gmap").src = `https://www.google.com/maps?q=${q}&z=15&output=embed`;
  $("#mapsLink").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/* ================= Footer / liens globaux ================= */
function renderGlobal() {
  $("#waFloat").href = waLink(`Bonjour, je vous contacte depuis le site de ${dealership.name}.`);
  $("#footerContact").innerHTML = `
    <h4>Contact</h4>
    <a href="tel:${dealership.phoneIntl}">Tél 1 : ${formatPhone(dealership.phone)}</a>
    <a href="tel:${dealership.phone2Intl}">Tél 2 : ${formatPhone(dealership.phone2)}</a>
    <a href="tel:${dealership.phoneFr}">Depuis la France : ${dealership.phoneFr}</a>
    <a href="${waLink("Bonjour !")}" target="_blank" rel="noopener">WhatsApp</a>
    <a href="#localisation">${dealership.address}</a>`;
  $("#year").textContent = new Date().getFullYear();
}

/* ================= Navigation mobile ================= */
function initNav() {
  const toggle = $("#navToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    document.body.style.overflow = "";
  }));
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ================= Apparition au scroll ================= */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ================= Init ================= */
document.addEventListener("DOMContentLoaded", () => {
  renderVehicles();
  renderContact();
  renderMap();
  renderGlobal();
  initNav();
  initReveal();
});
