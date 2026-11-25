# Pipeline por video

Entradas del autor: **guion** (texto o bullets, con o sin marcadores) + **audio** de la narración.

## 1. El guion está escrito por módulos

Todo guion llega dividido en **módulos**: unidades autocontenidas (arranque, explicación y cierre) pensadas también como video corto. El guion manda: tú no decides dónde empiezan ni terminan.


- `id` y título son obligatorios. `[GANCHO: ...]` es opcional; si falta, el gancho es la primera frase del módulo.
- Puede haber texto **fuera de módulos** (intro/outro del video largo). No genera clips.
- Excluir un módulo de los clips: `[MÓDULO: id | título | clip=no]`.
- Si el guion llega **sin módulos**, no los inventes: pregunta al autor cómo dividirlo.
- Marcadores opcionales (el agente funciona igual sin ellos):
  - `[EJEMPLO: tema]` → el autor quiere un ejemplo concreto de ese tema.
  - `[VISUAL: sugerencia]` → idea visual del autor (pista, no límite).

**Alineación con el audio:** localiza el texto de cada módulo en `words.json` para obtener su inicio y fin exactos y guárdalos en `data/<video-id>/modules.json` (`id`, `title`, `hook`, `start`, `end`, `clip`). Si el audio se desvía del guion y no puedes alinear con seguridad un módulo, avisa al autor en vez de adivinar.

## 2. Fases

### Fase 0 — Calibración (primer video, o cuando cambie `design-system.md`)
- Construye **3 escenas modelo** en `src/scenes/_golden/`: un `Flow`, un `Panel` (código o terminal real) y un `Grid` de logos. Con contenido real, en 16:9 y en 9:16, en una composición de ~20 s.
- Pasa la verificación automática (`docs/verificacion.md`) y muestra stills de ambos formatos al autor.
- Con su aprobación, esas escenas son la **referencia a imitar**: nuevas escenas deben tener el mismo nivel de tamaño, llenado y detalle.

### Fase 1 — Transcripción
- Copia el audio a `public/audio/<video-id>.*`.
- Ejecuta `transcribe.py` (faster-whisper) y genera `data/<video-id>/words.json` con `{word, start, end}` por palabra.
- Compara con el guion y señala diferencias o términos mal reconocidos. **No corrijas en silencio**: reporta y pregunta.

### Fase 2 — Análisis visual
- Recorre el guion con `docs/ejemplos-visuales.md`: términos genéricos, acciones y ejemplos por mostrar.
- Investiga y verifica ejemplos.
- Alinea los módulos y genera `modules.json`.
- Escribe los **fixtures** necesarios (código, terminal, diffs, JSON) en `data/<video-id>/fixtures/`.

### Fase 3 — Storyboard (PUNTO DE APROBACIÓN)
- Genera `storyboard.json` (formato en la sección 3) con los **visuales inferidos** marcados.
- Muestra la lista de módulos con sus tiempos para confirmar que coinciden con el audio.
- Presenta un resumen legible: por escena, **plantilla**, **elemento héroe**, **etiquetas** (≤ 6), qué se acerca con la cámara y qué es inferido.
- **Espera aprobación o cambios.** No avances sin ella.

### Fase 4 — Implementación
- Programa las escenas aprobadas con plantillas y componentes (`plantillas-escena.md`, `componentes.md`).
- Si falta un componente o plantilla, propónlo y créalo primero como reutilizable.
- Trabaja por **tandas de 3–5 escenas**. Al terminar cada tanda: ejecuta `npm run check` (ver `verificacion.md`), mira los stills de ambos formatos, corrige y recién entonces muestra el avance.

### Fase 5 — Preview y ajustes
- Revisa en el Studio **ambas orientaciones**.
- Corrige sincronización, legibilidad, llenado, zonas seguras y ritmo con ediciones mínimas.
- Borradores de video completo: `npx remotion render <Comp> out/draft/<nombre>.mp4 --scale=0.5`.

### Fase 6 — Render final
- Render de la versión larga, un clip por módulo y el archivo de capítulos. **Una sola vez**, a 1080p y 30 fps, con el storyboard y las escenas aprobados.
- Reporta por archivo: duración, resolución y tamaño.

## 3. Formato del storyboard

```json
{
  "videoId": "agentes-de-codigo",
  "fps": 30,
  "scenes": [
    {
      "id": 4,
      "module": "harness-que-es",
      "start": 42.5,
      "end": 58.0,
      "narration": "Un harness es lo que rodea al modelo y le permite actuar...",
      "template": "Cycle",
      "hero": "bucle del harness",
      "labels": ["usuario", "modelo", "herramienta", "resultado"],
      "camera": [
        { "t": 42.5, "focus": ["usuario"] },
        { "t": 47.2, "focus": ["usuario", "modelo", "herramienta", "resultado"] }
      ],
      "fixtures": [],
      "highlights": [
        { "t": 47.2, "anchor_word": "actuar", "element": "herramienta", "reason": "dice 'le permite actuar'" }
      ],
      "inferred_visuals": [
        {
          "type": "Grid",
          "t": 49.0,
          "anchor_word": "ejemplos",
          "items": ["agente de código en terminal A", "agente de código en terminal B", "agente en IDE C"],
          "reason": "el autor dice 'harness' sin dar ejemplos concretos",
          "verified": true,
          "source": "búsqueda web, fecha"
        }
      ],
      "example": false
    }
  ]
}
```

- Tiempos en **segundos**; en código: `frame = Math.round(seconds * fps)`.
- `template` es una de las plantillas de `plantillas-escena.md`; `labels` respeta el máximo (6 horizontal / 4 vertical).
- `camera` lista qué elementos están en foco desde cada instante; la cámara encuadra ese subconjunto.
- Cada highlight e `inferred_visual` se ancla a una palabra concreta de `words.json`.
- Los ejemplos del autor (`[EJEMPLO: tema]`) llevan `"example": true`.
- Los nombres en `items` de arriba son marcadores; los reales los eliges tú y los verificas.
- Cada escena pertenece a **un solo módulo**; ninguna escena cruza el límite entre módulos.

## 4. Composiciones y renders

### Composiciones en `Root.tsx`
Para cada video, composiciones con **la misma línea de tiempo** y distinto tamaño:
- `<VideoId>-16x9` → 1920×1080, video completo (YouTube).
- `<VideoId>-9x16` → 1080×1920, video completo en vertical (útil para pruebas y para recortar clips).
- Solo si hace falta: `<VideoId>-clip-<module-id>-9x16`.

`durationInFrames`, `fps`, `width` y `height` se definen en un solo lugar (`Root.tsx`).

### Módulos → clips verticales
- **Cortes** solo en los límites de módulo de `modules.json`; nunca a mitad de una explicación.
- **Render estándar:** composición `<VideoId>-9x16` con rango de frames (`Math.round(seconds * fps)`):

```bash
npx remotion render <VideoId>-9x16 out/clips/<module-id>.mp4 --frames=<startFrame>-<endFrame>
```

- **Verifica el primer clip de cada video:** audio recortado exactamente y sincronizado con la imagen. Solo si falla, plan B: una composición dedicada por clip con `calculateMetadata` (duración) y la línea de tiempo desplazada (patrón exacto en la skill `remotion-docs`).
- **Cada módulo se entiende solo.** El estado visual se reinicia al empezar; si necesita un diagrama que ya apareció antes, se reconstruye en su primera escena.
- **Todo estado visual es función pura del frame.**
- **Tarjetas de gancho/cierre (`ClipHook`, `ClipOutro`): opcionales**, solo si el autor las pide.

### Scripts de `package.json`
- `render:long` → `<VideoId>-16x9` a `out/<video-id>-16x9.mp4`.
- `render:clips` → script de Node que lee `modules.json` y renderiza un clip por módulo con `clip: true` a `out/clips/<module-id>-9x16.mp4`.
- `render:all` → ambos.
- `render:draft` → versión larga a `--scale=0.5` en `out/draft/`.
- `check` → verificación visual automática (`docs/verificacion.md`).
- Además genera `out/<video-id>-chapters.txt` con los módulos como capítulos de YouTube (`mm:ss Título`, uno por línea, empezando en `00:00`).

## 5. Calidad y cómputo

- **Estándar final:** 1920×1080 (y 1080×1920), 30 fps. No subir a 4K ni 60 fps: no aportan en este tipo de contenido y multiplican el render.
- **Borradores:** `--scale=0.5` (aprox. una cuarta parte del cómputo; mismo layout). Úsalos para revisar composición, tamaños y sincronización.
- Renderiza el final **una sola vez**, cuando todo esté aprobado.
- No juzgues la calidad por copias recomprimidas (por ejemplo, enviadas por WhatsApp); sube a YouTube el render original.
- Evita efectos pesados (blur y sombras masivas) y SVG o imágenes enormes.
