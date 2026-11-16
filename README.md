# ERP COMERCIAL · Landing

Landing de presentacion del ERP COMERCIAL de IntelliApps, construida con
Tailwind desde CDN (`https://cdn.tailwindcss.com`) y un `css/styles.css` con
lo que Tailwind no cubre (mockup de telefono, animaciones de scroll, formato
de numeros).

## Estructura

```
index.html            Estructura de la pagina
css/styles.css        Estilos propios (paleta, tipografia, mockup, animaciones)
js/videos.js          Catalogo de los 14 videos + las 12 etapas del ciclo
js/main.js            Interacciones: nav, revelado, contadores, filtros, modal
assets/brand/         Logos de IntelliApps
assets/img/           Fotografias de planta
videos/               Version web de los 14 videos (720x1280, crf 27, faststart)
thumbnails/           Miniatura de cada video
```

## Secciones

1. **Hero** — propuesta de valor y el video general dentro de un mockup de telefono.
2. **Empresa** — manifiesto con palabras que se encienden al hacer scroll, cifras y principios.
3. **El sistema** — las cuatro etapas: recepcion, documentacion, valorizacion y cierre.
4. **El ciclo** — las doce etapas del mineral, del porton a la factura.
5. **Videos** — catalogo de los 14 videos, filtrable por etapa.
6. **Antes / despues** — control en papel frente a control en el sistema.
7. **Servicios** — desarrollo a medida, integracion con balanzas y capacitacion.
8. **Contacto** — formulario que abre WhatsApp con el mensaje ya escrito.

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
