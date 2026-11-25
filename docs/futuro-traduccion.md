# Fase futura: traducción y doblaje (NO implementar todavía)

Lee este documento solo si el autor menciona traducción, doblaje o publicar en otro idioma.

## Objetivo
Publicar en Bilibili (chino) con traducción, subtítulos y voz doblada.

## Pipeline previsto
`words.json` → traducción (Argos Translate o NLLB) con `glossary.json` → TTS (Edge-TTS o Piper) → ajuste de duración con FFmpeg → subtítulos (`.srt`) → re-render.

## Qué hacer desde ahora para no bloquear esta fase
- Mantén los textos en pantalla como **datos o props extraíbles** (por eso todo texto pasa por `Text` y viene de props o de `data/`); nunca incrustados en imágenes.
- Mantén `data/<video-id>/glossary.json` con los términos técnicos que no deben traducirse mal (payload, exploit, fine-tuning, harness, etc.).
- Los **fixtures** (código, terminal, JSON) viven en `data/<video-id>/fixtures/`: el código no se traduce; los comentarios y textos sí podrían.
- Etiquetas cortas (1–3 palabras) son más fáciles de traducir y no rompen el layout. Deja margen para que una etiqueta traducida sea más larga (≈ 30 %) sin salirse de su nodo: `fitText` en `Text`.
- Deja espacio para subtítulos más largos en ambos formatos, aunque estén desactivados por defecto.
- Como layout y contenido están separados, un nuevo idioma será **otra pista de audio y otro set de textos sobre las mismas escenas**; el audio sigue siendo la fuente de verdad del tiempo, así que los tiempos del storyboard se recalculan con el nuevo `words.json`.
