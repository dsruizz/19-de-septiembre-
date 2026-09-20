# Nuestros Días

Experiencia web narrativa, privada, para celular — un regalo por el día del amor y la amistad.

## Cómo verla en tu computador

No necesitas instalar nada. Dos opciones:

1. **La más simple:** haz doble clic en `index.html` y se abre en el navegador.
2. **Recomendada (evita problemas de rutas):** desde VS Code, instala la extensión
   "Live Server", clic derecho sobre `index.html` → **"Open with Live Server"**.

Para verla como se vería en el celular real, abre las herramientas de desarrollador
del navegador (F12) y activa el modo de simulación de dispositivo móvil.

## Cómo agregar tus fotos (lo único que necesitas tocar la mayoría de las veces)

1. Abre `js/config.js`.
2. Ahí encuentras una lista organizada por momento de la historia (Conocimos, Monserrate,
   Canela, Graduación, etc.) y otra para "Todos los universos".
3. Cada línea es la ruta de un archivo, por ejemplo:
   `"assets/images/timeline/monserrate/foto-monserrate-01.jpg"`
4. Guarda tu foto real dentro de esa carpeta, con exactamente ese nombre.
5. Guarda el archivo y recarga la página. Listo — no hay que tocar nada más.

Mientras una foto no exista, la web muestra automáticamente un recuadro elegante
con el texto "FOTO — [NOMBRE]" en su lugar, así siempre sabes qué falta.

### ¿Dónde van las fotos?

```
assets/images/
  hero/                  → foto de fondo opcional de la portada
  universos/             → las 10 (o más) imágenes de "todos los universos"
  timeline/
    conocimos/
    casa/
    monserrate/
    salitre/
    halloween/
    diciembre/           (incluye también Festival Brilla y Cumpleaños 18)
    canela/               (incluye también la llegada de la bebé)
    picnic/               (incluye también el segundo picnic)
    cocina/
    paintball/
    trabajo/
    graduacion/
```

## Cómo editar los textos

Todos los textos están directamente en `index.html`, organizados en bloques
comentados por sección (`<!-- ESTACIÓN 01 — CONOCIMOS -->`, etc.). Busca el
texto que quieras cambiar y edítalo ahí; no rompe nada mientras no borres
las etiquetas `<p>`, `<span>` o las clases (`class="..."`).

## Cómo cambiar la fecha de la invitación final o el WhatsApp

También en `js/config.js`, al final:

```js
invitacion: {
  fecha: "Lunes 21 de septiembre de 2026",
  whatsapp: "", // ej: "573001234567" — déjalo vacío si no quieres el enlace
}
```

## Estructura del proyecto

```
index.html          → estructura y textos de toda la experiencia
css/style.css        → todos los estilos (colores, tipografía, layout)
js/config.js          → rutas de fotos + fecha de la invitación (ESTO editas)
js/photos.js          → convierte config.js en fotos o placeholders
js/loader.js          → pantalla de carga con la mariposa y el porcentaje
js/main.js            → animaciones (GSAP + ScrollTrigger + mariposa guía)
assets/images/...     → tus fotografías van aquí
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser privado).
2. Sube todo el contenido de esta carpeta a ese repositorio.
3. Ve a **Settings → Pages**, y en "Branch" selecciona `main` (carpeta `/root`).
4. Espera un par de minutos — GitHub te dará un enlace como
   `https://tu-usuario.github.io/tu-repositorio/`.

Si el repositorio es privado, solo tú (y quien invites como colaborador) podrán
verlo directamente en GitHub, pero **ten en cuenta que una GitHub Page publicada
es accesible por el enlace para cualquiera que lo tenga**, incluso si el repo es
privado. Si quieres mantenerla totalmente privada, comparte el enlace únicamente
por un canal directo (WhatsApp, por ejemplo) y no lo publiques en ningún otro lado.

## Notas técnicas

- No hay backend, base de datos, analítica ni servicios externos: solo HTML, CSS
  y JavaScript, más la librería GSAP (animación) cargada desde su CDN oficial.
- Las fotografías nunca salen de tu propio proyecto.
- Respeta `prefers-reduced-motion`: si el celular de quien la vea tiene el
  movimiento reducido activado, el contenido se muestra sin animaciones.
- Puedes agregar más universos copiando una línea dentro de `CONFIG.universos`
  en `config.js` — no hay límite de 10.
