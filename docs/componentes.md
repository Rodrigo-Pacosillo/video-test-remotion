# Librería de componentes

Se construye una vez y se reutiliza siempre. Antes de crear algo nuevo, revisa si ya existe.

## 1. Reglas para todos los componentes

1. **Props tipadas**, con valores por defecto y un comentario breve que explique cada prop.
2. Usan `useLayout()`; **cero px fijos**: tamaños en `u` o porcentaje de la zona segura.
3. **Todo texto pasa por `Text`** y solo con tokens de la escala (`display`, `title`, `label`, `caption`, `code`). Sin `fontSize` libre. El texto viene de props o de `data/`, nunca incrustado en imágenes.
4. **Los tamaños mínimos se imponen en el componente** (clamp): un `label` nunca baja de 3.5u, un logo nunca de 12u, el código nunca de 3u. Si no cabe, el componente acorta, pagina o avisa; no encoge.
5. **Sin modo placeholder.** `CodeBlock` exige `code`, `Terminal` exige `lines`, `DiffView` exige hunks reales. No existe un "esqueleto" ni barras grises.
6. **Animación solo desde el frame** (`useCurrentFrame` + `interpolate`/`spring`). Prohibidos CSS transitions/animations, `setTimeout`, `setInterval` y `Math.random` (usa `random(seed)` de Remotion).
7. **Estado visual = función pura del frame.**
8. Respetan el orden de capas: fondo → conectores → superficies → texto → cursor/resaltados.
9. Soportan `focus` y `dim`: cuando no son el foco, se atenúan al ~55 %.
10. Cada componente publica sus **dimensiones calculadas** (rectángulo) para que la cámara y el script de verificación puedan usarlas.
11. Un componente se prueba en ambas orientaciones antes de darse por terminado.

## 2. Núcleo (créalo antes del primer video)

| Componente | Función |
|---|---|
| `Text` | Texto con escala fija; etiquetas de 1–3 palabras; ajuste con `fitText` si hace falta |
| `Stage` | Cámara de escena: encuadra el bbox del foco para llenar la zona segura, anima con `spring`, admite deriva ≤ 4 % |
| `Background` | Fondo sobrio del video; con `checkMode` pasa a color liso `bg` |
| `Window` | Marco de ventana (botones, barra de título con nombre) para paneles |
| `Node` | Superficie con ícono + etiqueta, con estados activo/atenuado |
| `Connector` | Flecha o línea detrás del texto; termina en el borde; señal viajera opcional; etiqueta con fondo |
| `Title` / `TitleCard` | Apertura de módulo o de escena |
| `Logo` / `LogoGrid` / `NameChip` | Ejemplos de tecnologías, modelos y proveedores (`src/logos.ts`); `NameChip` si no hay logo oficial |
| `CodeBlock` | Código real con tokenizador, resaltado de líneas por tiempo, zoom a rango de líneas |
| `Terminal` | Prompt con directorio/rama, comandos con tipeo natural determinista, salida real, cursor |
| `Captions` | Subtítulos desde `words.json` (`remotion-captions`); **desactivado por defecto** |

## 3. Plantillas (en `src/templates/`)

`Title`, `Hero`, `Flow`, `Compare`, `Grid`, `Panel`, `Action`, `Cycle`, `Hub`: contratos y reglas en `plantillas-escena.md`. Cada plantilla expone:

```ts
type TemplateResult = {
  rects: Record<string, {x: number; y: number; w: number; h: number}>; // por elemento
  bboxFor: (ids: string[]) => {x: number; y: number; w: number; h: number};
};
```

para que `Stage` encuadre cualquier subconjunto sin medir el DOM.

## 4. Bajo demanda (créalos solo cuando una escena aprobada los necesite, avisando al autor)

| Componente | Función |
|---|---|
| `Callout`, `LowerThird` | Resaltados puntuales |
| `FileTree` | Árbol con altas, cambios y bajas animadas; íconos por tipo de archivo; ≥ 5 archivos creíbles |
| `DiffView` | Diff con números de línea, añadidas (verde) y eliminadas (rojo) |
| `ToolCallCard` | Llamada a herramienta: nombre → entrada → salida (reales) |
| `ChatBubble` | Mensajes usuario/modelo con avatar y rol |
| `JsonView` / `HttpView` | Cabeceras, cuerpos y respuestas con valores enmascarados |
| `ActionDemo` | Compone `FileTree`, `DiffView` y `Terminal` como una acción a la vez (plantilla `Action`) |
| `ClipHook` / `ClipOutro` | Solo si el autor las pide |

## 5. Dependencias

- Pre-aprobado: `sharp` (devDependency) para la verificación; `@remotion/layout-utils` y `@remotion/transitions` del ecosistema Remotion (consulta `remotion-docs`).
- Resaltado de sintaxis (`shiki` o `prism-react-renderer`), y cualquier otra: **avisa y justifica antes de instalar**; fija la versión.
- Los paquetes de logos son solo fuente: copia los SVG usados a `public/assets/logos/` y referéncialos con `staticFile()`. Si un paquete ESM da problemas al importar como componente, usa los SVG estáticos de `public/`.
