# ERP COMERCIAL · Landing

Landing de presentacion del ERP COMERCIAL de IntelliApps, con Tailwind desde
CDN (`https://cdn.tailwindcss.com`) y un `css/styles.css` con lo que Tailwind
no cubre.

## Estructura

```
index.html            Estructura de la pagina
css/styles.css        Paleta, tipografia, tarjetas, riel de videos y modal
js/videos.js          Las 12 etapas, los 5 equipos, los servicios y los 14 videos
js/main.js            Interacciones: nav, revelado, filtros, riel, modal y formulario
assets/brand/         Logos de IntelliApps
assets/img/           Foto de planta del hero
videos/               Version web de los 14 videos (720x1280, crf 27, faststart)
thumbnails/           Miniatura de cada video
```

## Secciones

1. **Hero** — foto de planta, titular y la pantalla real del sistema encima.
2. **Cifras** — tres datos del servicio, en una linea cada uno.
3. **El ciclo** — las doce etapas del mineral, en una grilla de nombres.
   Debajo, las cinco areas y que registra cada una.
4. **Videos** — banda oscura con el catalogo de los 14 videos, filtrable por etapa.
5. **Servicios y contacto** — que hace IntelliApps ademas del ERP, y el formulario.

El criterio de la pagina es que se escanee: no hay parrafos largos ni
comparaciones de "antes y despues". El detalle de cada proceso esta en su
video, y el texto de la landing solo dice que hay y a quien le toca.

## Paleta

Base clara tipo papel (`#F5F2EA`), tinta casi negra (`#14161A`), un unico
acento ambar (`#D8922E`) y una sola banda oscura para el catalogo de videos,
donde las capturas necesitan un fondo oscuro para leerse.

## Actualizar los videos

Los archivos de `videos/` y `thumbnails/` se generan desde el proyecto de
video:

```bash
cd ../videos
npm run render                        # exporta out/
node scripts/prepare-landing.mjs      # copia a landing/ con version web y miniaturas
```

El catalogo de `js/videos.js` y las rutas de `videos/` deben coincidir con los
nombres de archivo exportados (`NN-nombre-del-proceso`).

Al tocar `css/styles.css` o los scripts, subir el `?v=` del `index.html` para
que los navegadores no sirvan la version anterior.
