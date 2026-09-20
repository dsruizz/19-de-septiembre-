/* ============================================================
   LOADER.JS
   ------------------------------------------------------------
   Controla la pantalla de carga inicial. El porcentaje refleja
   el avance real de: fuentes tipográficas + imagen del hero
   (si existe) + un pequeño mínimo de tiempo para que la
   animación de la mariposa se sienta intencional, no cortada.
   Al terminar, dispara el evento "app:ready" que usa main.js
   para arrancar el resto de las animaciones.
   ============================================================ */

(function initLoader(){
  const loaderEl = document.getElementById("loader");
  const percentEl = document.getElementById("loader-percent");

  let target = 6;     // arranque visible inmediato
  let shown = 0;
  let done = false;

  function paint(){
    shown += (target - shown) * 0.14;
    if (target - shown < 0.15) shown = target;
    percentEl.textContent = Math.round(shown) + "%";
    if (shown < 100){
      requestAnimationFrame(paint);
    } else if (!done){
      done = true;
      finishLoading();
    }
  }
  requestAnimationFrame(paint);

  const tasks = [];

  // 1. Fuentes tipográficas
  tasks.push(
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve())
      .catch(() => {})
  );

  // 2. Imagen de fondo del hero (si está configurada)
  const heroSrc = (typeof CONFIG !== "undefined" && CONFIG.hero && CONFIG.hero.background) || "";
  if (heroSrc){
    tasks.push(new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve; // si no existe aún, no bloquea la carga
      img.src = heroSrc;
    }));
  }

  // 3. Tiempo mínimo para que la mariposa respire (no es relleno falso,
  //    evita que la pantalla parpadee en conexiones muy rápidas)
  tasks.push(new Promise((resolve) => setTimeout(resolve, 1100)));

  let resolved = 0;
  const totalSteps = tasks.length;
  tasks.forEach((p) => {
    p.then(() => {
      resolved += 1;
      target = 10 + Math.round((resolved / totalSteps) * 90);
    });
  });

  Promise.all(tasks).then(() => { target = 100; });

  function finishLoading(){
    document.dispatchEvent(new CustomEvent("app:ready"));
    loaderEl.classList.add("is-hidden");
    setTimeout(() => { loaderEl.style.display = "none"; }, 950);
    document.documentElement.style.removeProperty("overflow");
  }

  document.documentElement.style.overflow = "hidden";
})();
