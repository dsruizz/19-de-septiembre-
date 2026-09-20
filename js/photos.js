/* ============================================================
   PHOTOS.JS
   ------------------------------------------------------------
   Convierte las rutas de CONFIG en elementos <div class="photo">.
   Si la imagen no existe todavía, se ve un placeholder elegante
   con el nombre exacto de la foto que falta. No hay que tocar
   este archivo para agregar fotos: eso se hace en config.js.
   ============================================================ */

const PHOTO_LABELS = {
  conocimos: "CONOCIMOS",
  casa: "CASA",
  monserrate: "MONSERRATE",
  salitre: "SALITRE MÁGICO",
  halloween: "HALLOWEEN",
  diciembre: "DICIEMBRE",
  festivalbrilla: "FESTIVAL BRILLA",
  cumple18: "CUMPLEAÑOS 18",
  canela: "CANELA",
  llegadacanela: "LLEGADA CANELA",
  picnic: "PICNIC",
  picnic2: "SEGUNDO PICNIC",
  cocina: "COCINA",
  paintball: "PAINTBALL",
  trabajo: "TRABAJO",
  graduacion: "GRADUACIÓN",
};

/* patrón de tamaños/desplazamientos para que una galería nunca
   se vea como una cuadrícula convencional */
const LAYOUT_PATTERN = ["full", "offset-l", "offset-r", "full", "offset-r", "offset-l"];

function buildPhotoEl(src, label, sizeClass, layoutClass){
  // estructura tipo "polaroid": marco de papel (.photo) + ventana de la
  // imagen (.photo-inner), así las fotos combinan con las tarjetas de texto.
  const wrap = document.createElement("div");
  wrap.className = `photo ${sizeClass || ""} ${layoutClass || ""}`.trim();

  const inner = document.createElement("div");
  inner.className = "photo-inner";
  wrap.appendChild(inner);

  const span = document.createElement("span");
  span.className = "placeholder-label";
  span.textContent = `FOTO — ${label}`;
  inner.appendChild(span);

  const img = document.createElement("img");
  img.alt = label;
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("load", () => wrap.classList.add("is-loaded"));
  img.addEventListener("error", () => wrap.classList.remove("is-loaded"));
  img.src = src;
  inner.appendChild(img);

  return wrap;
}

/** Rellena todos los .galeria[data-gallery] con las fotos definidas en CONFIG.timeline */
function renderGalleries(){
  document.querySelectorAll(".galeria[data-gallery]").forEach((container) => {
    const key = container.getAttribute("data-gallery");
    const files = (CONFIG.timeline && CONFIG.timeline[key]) || [];
    const niceLabel = PHOTO_LABELS[key] || key.toUpperCase();
    const sizeClass = container.getAttribute("data-size") || "";

    files.forEach((file, i) => {
      const label = `${niceLabel} ${String(i + 1).padStart(2, "0")}`;
      const layoutClass = LAYOUT_PATTERN[i % LAYOUT_PATTERN.length];
      container.appendChild(buildPhotoEl(file, label, sizeClass, layoutClass));
    });
  });
}

/** Rellena el carrusel de "todos los universos" desde CONFIG.universos */
function renderUniversos(){
  const track = document.getElementById("universos-track");
  const dotsWrap = document.getElementById("universos-dots");
  if (!track) return;

  CONFIG.universos.forEach((u, i) => {
    const item = document.createElement("div");
    item.className = "universo-item";

    const photo = buildPhotoEl(u.file, u.label, "photo--tall", "");
    item.appendChild(photo);

    const label = document.createElement("div");
    label.className = "universo-label";
    label.textContent = u.label;
    item.appendChild(label);

    track.appendChild(item);

    if (dotsWrap){
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " is-active" : "");
      dotsWrap.appendChild(dot);
    }
  });

  // resalta el punto activo según la posición del scroll horizontal
  let ticking = false;
  track.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const idx = Math.round(track.scrollLeft / (track.firstElementChild ? track.firstElementChild.offsetWidth : 1));
      dotsWrap && Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle("is-active", i === idx));
      ticking = false;
    });
  });
}

/** Foto de fondo opcional del hero */
function renderHeroBackground(){
  const el = document.getElementById("hero-bg");
  const src = CONFIG.hero && CONFIG.hero.background;
  if (!el || !src) return;
  const img = new Image();
  img.onload = () => { el.style.backgroundImage = `url("${src}")`; el.classList.add("is-loaded"); };
  img.src = src;
}

/** Aplica la fecha y el aviso de WhatsApp de la invitación final desde CONFIG */
function applyInvitacion(){
  const inv = (typeof CONFIG !== "undefined" && CONFIG.invitacion) || {};
  const fechaEl = document.getElementById("invitacion-fecha-texto");
  if (fechaEl && inv.fecha) fechaEl.textContent = inv.fecha;

  const waEl = document.getElementById("invitacion-whatsapp");
  if (waEl && inv.whatsapp){
    waEl.innerHTML = `tu respuesta llegará por WhatsApp 💬 — <a href="https://wa.me/${inv.whatsapp}" target="_blank" rel="noopener">abrir chat</a>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderGalleries();
  renderUniversos();
  renderHeroBackground();
  applyInvitacion();
});
