# AGENTS.md — Videos explicativos (Remotion)

Lee este archivo completo antes de empezar. Es corto a propósito: el detalle vive en `docs/`, y **antes de cada fase debes leer los documentos que indica la sección 5**. Si algo no está claro, haz **una** pregunta antes de actuar.

Prioridad cuando dos reglas chocan: honestidad de los datos > audio > storyboard aprobado > reglas visuales de este archivo > preferencias estéticas.

## 1. Objetivo

- Producir la **parte visual** de videos explicativos sobre programación, IA y ciberseguridad. El autor graba el audio (sin cámara); tú haces todo lo que se ve.
- El video es **visual primero**: casi todo debe entenderse *mirando* (diagramas, código real, terminal, logos, acciones animadas), no leyendo. El texto en pantalla es el mínimo necesario.
- Una sola fuente (guion, audio, storyboard, escenas) → dos salidas:
  - **YouTube**: horizontal 16:9, 1920×1080.
  - **TikTok y similares**: clips verticales 9:16, 1080×1920, uno por módulo del guion.
- Ambos formatos llevan el **mismo contenido**; solo cambia el layout.
- Idioma: español. Traducción y doblaje son fase futura (`docs/futuro-traduccion.md`): no implementar hasta que se pida.
- Duración: no se asume ninguna. El audio manda.
- Este proyecto se reutiliza en muchos videos de temas distintos: nada de lo que hagas debe depender de un tema concreto.

## 2. Principios no negociables

1. **El audio es la fuente de verdad del tiempo.** Nunca cambies su duración ni su velocidad.
2. **Una sola base de escenas para todos los formatos.** Prohibido recortar el horizontal para hacer el vertical y prohibido duplicar escenas por formato (salvo override puntual justificado).
3. **Sin storyboard aprobado no se programan escenas.** Se propone, el autor revisa, luego se programa.
4. **Piensa visualmente, no transcribas.** Si el guion es genérico, tú eliges ejemplos concretos y reales (`docs/ejemplos-visuales.md`).
5. **Contenido real, nunca de relleno.** Prohibidas las barras grises que "simulan" código o texto, los spinners como símbolo y el lorem ipsum. Si se muestra código, terminal o datos, son reales, correctos y legibles.
6. **Reglas visuales con números** (sección 3). Se cumplen en todo momento y se verifican con el script de verificación.
7. **Plantillas y componentes, no diseño libre.** Cada escena usa una plantilla de `docs/plantillas-escena.md` y los componentes de `docs/componentes.md`. No inventes layouts nuevos sin proponerlos.
8. **Cambios pequeños y revisables.** No renombres archivos, no cambies componentes compartidos ni agregues dependencias sin avisar y justificar.
9. **Sin red al renderizar.** Logos, imágenes y fuentes se guardan en `public/` y se versionan.
10. **No inventes datos técnicos.** Lo no verificado se marca `verified: false` o se pregunta.
11. **No digas "listo" sin verificar.** Ejecuta `docs/verificacion.md`: script automático + revisión visual de stills de ambos formatos.

## 3. Reglas visuales críticas (resumen; detalle y motivos en `docs/design-system.md`)

| Regla | Valor |
|---|---|
| Unidad | `u = min(ancho, alto) / 100` (= 10.8 px en ambos formatos). Todo tamaño en `u`. Nunca px fijos. |
| Ancho de componente | ≤ **72u** en vertical y ≤ **150u** en horizontal; nunca recortar |
| Texto | etiquetas 4u (mín. 3.5u); título 6.5u; código mín. 3u; **nada por debajo de 3u** |
| Logos e íconos | 14–18u (mín. 12u en cuadrículas densas) |
| Llenado (contenido visible vs. zona segura) | horizontal ≥ 60 % del ancho y ≥ 45 % del alto; vertical ≥ 75 % del ancho y ≥ 40 % del alto. **En todo momento** (la cámara reencuadra según lo que ya apareció) |
| Centrado | centro del contenido a ±8 % (horizontal) y ±10 % (vertical) del centro de la zona segura |
| Bordes | nada a menos de 4u del borde de la zona segura; nada cortado por el cuadro |
| Elementos principales a la vez | máx. 6 en horizontal, máx. 4 en vertical |
| Texto en pantalla | etiquetas de 1–3 palabras, sin frases; máx. 6 (horizontal) / 4 (vertical) por escena |
| Conectores | siempre detrás del texto, terminan en el borde del nodo, etiquetas con fondo propio |
| Contraste | texto principal ≥ 7:1, secundario ≥ 4.5:1; superficies distinguibles del fondo (relleno y borde) |
| Foco | un solo elemento con brillo; el resto atenuado |
| Subtítulos | **desactivados por defecto**; solo si el autor los pide para un video |
| Calidad | 1080p, 30 fps. Borradores con `--scale=0.5`; render final una sola vez |

Zonas seguras iniciales: horizontal 5 % en todos los lados; vertical arriba 10 %, abajo 20 %, derecha 12 %, izquierda 6 %. Viven en `theme.ts`.

## 4. Flujo por fases (detalle en `docs/pipeline.md`)

0. **Calibración** (primer video o si cambia el diseño): 3 escenas modelo en ambos formatos, aprobadas por el autor. Luego se imitan.
1. **Transcripción** → `words.json`. Comparar con el guion y reportar diferencias; no corregir en silencio.
2. **Análisis visual** → términos genéricos, acciones y ejemplos; módulos alineados en `modules.json`.
3. **Storyboard (aprobación)** → por escena: plantilla, elemento héroe, etiquetas, cámara, visuales inferidos. Esperar aprobación.
4. **Implementación** → tandas de 3–5 escenas; tras cada tanda, correr la verificación.
5. **Preview y ajustes** → revisar stills de 16:9 y 9:16; corregir.
6. **Render final** → versión larga, un clip por módulo, `chapters.txt`.

## 5. Qué leer y cuándo

| Antes de… | Lee |
|---|---|
| Instalar o preparar el proyecto (solo si falta algo) | `docs/setup.md` |
| Cualquier fase | `docs/pipeline.md` |
| Proponer un storyboard o programar una escena | `docs/design-system.md`, `docs/formatos-16x9-9x16.md`, `docs/plantillas-escena.md`, `docs/ejemplos-visuales.md` y `LECCIONES.md` |
| Crear o modificar componentes | `docs/componentes.md` |
| Dar algo por terminado | `docs/verificacion.md` |
| Si el autor menciona traducción o doblaje | `docs/futuro-traduccion.md` |

`LECCIONES.md` recoge errores reales ya cometidos. Leerlo es obligatorio antes de programar escenas.

## 6. Stack y estructura

| Pieza | Herramienta |
|---|---|
| Video por código | Remotion (React + TypeScript), 30 fps |
| Logos IA/LLM | `@lobehub/icons-static-svg` (SVG estáticos) |
| Logos tecnología general | `simple-icons` (verificar cada marca) |
| Transcripción | faster-whisper (Python), timestamps por palabra |
| Utilidades | FFmpeg; `sharp` (dev) para la verificación |
| Clips externos (solo si se piden) | Manim, VHS |

```
explainer-videos/
├── AGENTS.md  ·  LECCIONES.md  ·  docs/
├── public/audio/  ·  public/assets/{logos,fonts}/
├── data/<video-id>/{script.md, words.json, modules.json, storyboard.json, glossary.json, fixtures/}
├── src/{Root.tsx, theme.ts, layout.ts, logos.ts, components/, templates/, scenes/<video-id>/, videos/<video-id>.tsx}
├── scripts/{check-visual.mjs, render-clips.mjs}
└── out/{draft/, check/, clips/}
```

## 7. Cómo comunicarte con el autor

- Responde en **español**, breve y concreto.
- Al cerrar cada fase: qué hiciste, qué supuestos asumiste y qué debe aprobar el autor.
- Ante ambigüedad, **una** pregunta clara en vez de asumir.
- Si un comando falla: muestra el error y propón el arreglo mínimo; no cambies la arquitectura por tu cuenta.
- Cuando el autor señale un fallo visual nuevo, propón una entrada para `LECCIONES.md`.
