/* ============================================================
   CONFIG.JS
   ------------------------------------------------------------
   AQUÍ es donde pones tus fotos reales. No necesitas tocar
   ningún otro archivo para agregar o cambiar fotografías.

   Cómo funciona:
   1. Guarda tu foto dentro de la carpeta indicada en /assets/images/...
   2. Escribe el nombre exacto del archivo en la lista de abajo.
   3. Si el archivo no existe todavía, la web muestra automáticamente
      un placeholder elegante con la etiqueta (ej: "FOTO — CANELA 01").
      No pasa nada si lo dejas vacío por ahora.

   No necesitas saber programar para editar este archivo.
   ============================================================ */

const CONFIG = {

  /* ---------- HERO / PORTADA ---------- */
  hero: {
    // Foto de fondo opcional para la apertura. Déjala vacía ("") si no quieres ninguna.
    background: "assets/images/hero/foto-hero-01.jpg",
  },

  /* ---------- "¿CREES QUE ESTEMOS JUNTOS EN TODOS LOS UNIVERSOS?" ----------
     Agrega tantos universos como quieras (mínimo pensado: 10).
     "label" es el texto pequeño que aparece bajo la imagen. */
  universos: [
    { label: "Universo 01", file: "assets/images/universos/universo-01.jpg" },
    { label: "Universo 02", file: "assets/images/universos/universo-02.jpg" },
    { label: "Universo 03", file: "assets/images/universos/universo-03.jpg" },
    { label: "Universo 04", file: "assets/images/universos/universo-04.jpg" },
    { label: "Universo 05", file: "assets/images/universos/universo-05.jpg" },
    { label: "Universo 06", file: "assets/images/universos/universo-06.jpg" },
    { label: "Universo 07", file: "assets/images/universos/universo-07.jpg" },
    { label: "Universo 08", file: "assets/images/universos/universo-08.jpg" },
    { label: "Universo 09", file: "assets/images/universos/universo-09.jpg" },
    { label: "Universo 10", file: "assets/images/universos/universo-10.jpg" },
    // Para agregar más, copia una línea y cambia el número:
    // { label: "Universo 11", file: "assets/images/universos/universo-11.jpg" },
  ],

  /* ---------- LÍNEA DE TIEMPO ----------
     Cada estación tiene su propia carpeta dentro de /assets/images/timeline/
     Solo escribe los nombres de archivo que vayas a usar. */
  timeline: {

    conocimos: [
      "assets/images/timeline/conocimos/foto-conocimos-01.jpg",
      "assets/images/timeline/conocimos/foto-conocimos-02.jpg",
    ],

    casa: [
      "assets/images/timeline/casa/foto-casa-01.jpg",
      "assets/images/timeline/casa/foto-casa-02.jpg",
      "assets/images/timeline/casa/foto-casa-03.jpg",
    ],

    monserrate: [
      "assets/images/timeline/monserrate/foto-monserrate-01.jpg",
      "assets/images/timeline/monserrate/foto-monserrate-02.jpg",
      "assets/images/timeline/monserrate/foto-monserrate-03.jpg",
      "assets/images/timeline/monserrate/foto-monserrate-04.jpg",
      "assets/images/timeline/monserrate/foto-monserrate-05.jpg",
      "assets/images/timeline/monserrate/foto-monserrate-06.jpg",
      "assets/images/timeline/monserrate/foto-monserrate-07.jpg",
      "assets/images/timeline/monserrate/foto-monserrate-08.jpg",
    ],

    salitre: [
      "assets/images/timeline/salitre/foto-salitre-01.jpg",
      "assets/images/timeline/salitre/foto-salitre-02.jpg",
      "assets/images/timeline/salitre/foto-salitre-03.jpg",
    ],

    halloween: [
      "assets/images/timeline/halloween/foto-halloween-01.jpg",
      "assets/images/timeline/halloween/foto-halloween-02.jpg",
      "assets/images/timeline/halloween/foto-halloween-03.jpg",
    ],

    diciembre: [
      "assets/images/timeline/diciembre/foto-diciembre-01.jpg",
      "assets/images/timeline/diciembre/foto-diciembre-02.jpg",
    ],

    festivalbrilla: [
      "assets/images/timeline/diciembre/foto-brilla-01.jpg",
      "assets/images/timeline/diciembre/foto-brilla-02.jpg",
      "assets/images/timeline/diciembre/foto-brilla-03.jpg",
    ],

    cumple18: [
      "assets/images/timeline/diciembre/foto-cumple18-01.jpg",
      "assets/images/timeline/diciembre/foto-cumple18-02.jpg",
    ],

    canela: [
      "assets/images/timeline/canela/foto-canela-01.jpg",
      "assets/images/timeline/canela/foto-canela-02.jpg",
      "assets/images/timeline/canela/foto-canela-03.jpg",
    ],

    llegadacanela: [
      "assets/images/timeline/canela/foto-llegada-canela-01.jpg",
      "assets/images/timeline/canela/foto-llegada-canela-02.jpg",
    ],

    picnic: [
      "assets/images/timeline/picnic/foto-picnic-01.jpg",
      "assets/images/timeline/picnic/foto-picnic-02.jpg",
      "assets/images/timeline/picnic/foto-picnic-03.jpg",
    ],

    picnic2: [
      "assets/images/timeline/picnic/foto-picnic2-01.jpg",
      "assets/images/timeline/picnic/foto-picnic2-02.jpg",
    ],

    cocina: [
      "assets/images/timeline/cocina/foto-cocina-01.jpg",
      "assets/images/timeline/cocina/foto-cocina-02.jpg",
      "assets/images/timeline/cocina/foto-cocina-03.jpg",
      "assets/images/timeline/cocina/foto-cocina-04.jpg",
    ],

    paintball: [
      "assets/images/timeline/paintball/foto-paintball-01.jpg",
      "assets/images/timeline/paintball/foto-paintball-02.jpg",
      "assets/images/timeline/paintball/foto-paintball-03.jpg",
    ],

    trabajo: [
      "assets/images/timeline/trabajo/foto-trabajo-01.jpg",
      "assets/images/timeline/trabajo/foto-trabajo-02.jpg",
    ],

    graduacion: [
      "assets/images/timeline/graduacion/foto-graduacion-01.jpg",
      "assets/images/timeline/graduacion/foto-graduacion-02.jpg",
      "assets/images/timeline/graduacion/foto-graduacion-03.jpg",
      "assets/images/timeline/graduacion/foto-graduacion-04.jpg",
      "assets/images/timeline/graduacion/foto-graduacion-05.jpg",
      "assets/images/timeline/graduacion/foto-graduacion-06.jpg",
      "assets/images/timeline/graduacion/foto-graduacion-07.jpg",
      "assets/images/timeline/graduacion/foto-graduacion-08.jpg",
    ],
  },

  /* ---------- INVITACIÓN FINAL ---------- */
  invitacion: {
    fecha: "Lunes 21 de septiembre de 2026",
    // Número de WhatsApp opcional. Formato internacional sin "+" ni espacios, ej: "573001234567"
    // Si lo dejas vacío, solo se muestra el texto sin enlace.
    whatsapp: "",
  },
};
