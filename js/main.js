/* ============================================================
   MAIN.JS
   ------------------------------------------------------------
   Todas las animaciones viven aquí. Si quieres cambiar textos
   o fotos, NO necesitas tocar este archivo — eso se hace en
   index.html (textos) y config.js (fotos).

   Este archivo:
   1. Reproduce la secuencia de apertura del hero.
   2. Revela cada tarjeta (el "papel" de cada texto) como un
      único momento orquestado al entrar en pantalla.
   3. Mueve la mariposa a lo largo de una curva orgánica que
      sigue exactamente el progreso del scroll — sin librerías
      adicionales, para que responda de inmediato al dedo en
      el celular.
   ============================================================ */

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function safeRegisterGSAP(){
  if (typeof gsap === "undefined") return false;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
  return true;
}

function debounce(fn, wait){
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

/* -------- revelado genérico al hacer scroll (un solo momento por tarjeta) -------- */
function revealOnScroll(selector, { y = 26, duration = 1, stagger = 0 } = {}){
  document.querySelectorAll(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  });
}

function revealGalleryPhotos(){
  document.querySelectorAll(".galeria").forEach((group) => {
    const photos = group.querySelectorAll(".photo");
    if (!photos.length) return;
    gsap.fromTo(
      photos,
      { opacity: 0, y: 34 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.15,
        scrollTrigger: { trigger: group, start: "top 90%", once: true },
      }
    );
  });
}

/* -------- secuencia de apertura del hero -------- */
function playHeroIntro(){
  const items = ["#hero-susurro", "#hero-titulo", "#hero-sub", "#hero-scroll"];
  if (REDUCED_MOTION || typeof gsap === "undefined"){
    items.forEach((s) => { const el = document.querySelector(s); if (el) el.style.opacity = 1; });
    const tarjeta = document.querySelector(".hero-tarjeta");
    if (tarjeta) tarjeta.style.opacity = 1;
    return;
  }
  gsap.set(".hero-tarjeta", { opacity: 0, y: 22 });
  gsap.set(items, { opacity: 0, y: 14 });
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.to(".hero-tarjeta", { opacity: 1, y: 0, duration: 1 }, 0.1)
    .to("#hero-susurro", { opacity: 1, y: 0, duration: 1.1 }, 0.35)
    .to("#hero-titulo", { opacity: 1, y: 0, duration: 1.1 }, "+=0.3")
    .to("#hero-sub", { opacity: 1, y: 0, duration: 1 }, "+=0.25")
    .to("#hero-scroll", { opacity: 0.7, y: 0, duration: 1 }, "+=0.2");
}

/* -------- curva orgánica de la timeline (solo para dibujar la línea punteada) -------- */
function computeWaveParams(){
  const timelineEl = document.getElementById("timeline");
  const w = timelineEl.offsetWidth;
  const h = timelineEl.scrollHeight;
  return {
    w, h,
    amplitude: Math.min(w * 0.26, 120),
    centerX: w / 2,
    waveLength: Math.max(h / 16, 180),
  };
}

function xAtY(y, params){
  return params.centerX + Math.sin((y / params.waveLength) * Math.PI) * params.amplitude;
}

function drawTimelinePath(params){
  const svg = document.getElementById("timeline-svg");
  const path = document.getElementById("timeline-path");
  if (!svg || !path) return;
  svg.setAttribute("viewBox", `0 0 ${params.w} ${params.h}`);

  const points = [];
  for (let y = 0; y <= params.h; y += params.waveLength / 2){
    points.push({ x: xAtY(y, params), y });
  }
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++){
    const p0 = points[i - 1];
    const p1 = points[i];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x.toFixed(1)} ${midY.toFixed(1)}, ${p1.x.toFixed(1)} ${midY.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  path.setAttribute("d", d);
}

/* -------- mariposa guía: se mueve 1:1 con el progreso real del scroll --------
   (se calcula la posición directamente en cada tick de ScrollTrigger, sin
   librerías de motion-path extra, para que en móvil responda de inmediato
   al gesto de deslizar el dedo — sin retraso ni pasos perdidos.) */
let butterflyST = null;

function setupButterfly(){
  const butterfly = document.getElementById("timeline-butterfly");
  const timelineEl = document.getElementById("timeline");
  if (!butterfly || !timelineEl || REDUCED_MOTION) return;

  let params = computeWaveParams();
  drawTimelinePath(params);
  gsap.set(butterfly, { x: xAtY(0, params), y: 0, xPercent: -50, yPercent: -50 });

  if (butterflyST) butterflyST.kill();

  butterflyST = ScrollTrigger.create({
    trigger: timelineEl,
    start: "top top",
    end: "bottom bottom",
    scrub: true, // sin suavizado: se mueve exactamente con el dedo
    onUpdate(self){
      const y = self.progress * params.h;
      const x = xAtY(y, params);
      gsap.set(butterfly, { x, y, xPercent: -50, yPercent: -50 });
    },
  });

  // la mariposa se detiene levemente al llegar a cada estación
  document.querySelectorAll(".estacion").forEach((estacion) => {
    ScrollTrigger.create({
      trigger: estacion,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => gsap.to(butterfly, { scale: 0.72, opacity: 0.8, duration: 0.45, ease: "power2.out" }),
      onLeave: () => gsap.to(butterfly, { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }),
      onEnterBack: () => gsap.to(butterfly, { scale: 0.72, opacity: 0.8, duration: 0.45, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(butterfly, { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }),
    });
  });

  const rebuild = debounce(() => {
    params = computeWaveParams();
    drawTimelinePath(params);
    ScrollTrigger.refresh();
  }, 250);
  window.addEventListener("resize", rebuild);
  window.addEventListener("orientationchange", rebuild);
}

/* -------- universos: aparición del carrusel -------- */
function setupUniversos(){
  gsap.fromTo(
    "#universos-track .universo-item",
    { opacity: 0, y: 26 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08,
      scrollTrigger: { trigger: "#universos-track", start: "top 85%", once: true },
    }
  );
}

/* -------- arranque general -------- */
function initScrollAnimations(){
  revealOnScroll(".tarjeta", { y: 30, duration: 1.05 });
  revealOnScroll(".transicion-texto", { y: 20 });
  revealOnScroll(".mensaje-titulo", { y: 18 });
  revealOnScroll(".invitacion-pregunta", { y: 20 });
  revealOnScroll(".invitacion-fecha", { y: 12 });
  revealOnScroll(".cierre-texto", { y: 16 });
  revealOnScroll(".universos-titulo", { y: 18 });
  revealOnScroll(".flourish", { y: 10, duration: 0.8 });

  revealGalleryPhotos();
  setupUniversos();
  setupButterfly();

  // se asegura de que las medidas sean correctas cuando todo terminó de cargar
  window.addEventListener("load", () => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 400);
}

document.addEventListener("app:ready", () => {
  playHeroIntro();
  if (safeRegisterGSAP()){
    setTimeout(initScrollAnimations, 60);
  }
});
