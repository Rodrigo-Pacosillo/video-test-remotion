# Plantillas de escena y layout adaptable (16:9 y 9:16)

Cada escena elige **una plantilla** de este documento. Las plantillas existen para quitar libertad donde el agente suele equivocarse (posición y tamaño) y dejarla donde aporta (qué ejemplos se muestran).

## 1. Principio: una escena, dos layouts

- La escena describe **qué** se muestra (nodos, relaciones, ítems, código), no **dónde** en píxeles.
- La plantilla decide la colocación según la orientación.
- ❌ Prohibido recortar o hacer zoom central del horizontal para obtener el vertical.
- ❌ Prohibido duplicar escenas (`Scene01Horizontal`, `Scene01Vertical`).
- ✅ Override puntual permitido dentro de la misma escena: `orientation === 'portrait' ? <Simplificada/> : <Completa/>`, **reutilizando los mismos datos**.
- En vertical hay menos espacio: se muestran **menos elementos a la vez** (máx. 4 principales). Si la escena tiene más, la plantilla pagina o agrupa, y la cámara sigue al foco.

## 2. Infraestructura

### `src/layout.ts`

```ts
import {useVideoConfig} from 'remotion';
import {SAFE} from './theme'; // fracciones {top, bottom, left, right} por orientación

export const useLayout = () => {
  const {width, height} = useVideoConfig();
  const orientation = width >= height ? 'landscape' : 'portrait';
  const u = Math.min(width, height) / 100;
  const s = SAFE[orientation];
  const safe = {
    x: width * s.left,
    y: height * s.top,
    w: width * (1 - s.left - s.right),
    h: height * (1 - s.top - s.bottom),
  };
  return {width, height, orientation, u, safe};
};
```

### Reglas de infraestructura

- Cada plantilla calcula posiciones y tamaños con **funciones puras** `(orientation, u, safe, items) → rectángulos`. No mide el DOM; para texto usa `measureText`/`fitText` de `@remotion/layout-utils` (consulta `remotion-docs` para la API vigente).
- `Stage` (cámara) recibe esos rectángulos y encuadra el subconjunto en foco (ver `design-system.md`, sección 2).
- Las plantillas cumplen por construcción las reglas de llenado, centrado y bordes. El script de verificación lo confirma.
- Un cambio en una escena se refleja en todos los formatos; nunca se edita un formato por separado.

## 3. Catálogo

Todas respetan: texto con escala fija, logos 14–18u, ≤ 6 (horizontal) / ≤ 4 (vertical) elementos principales, zona segura.

### T0 · `Title` — apertura de módulo
- **Uso:** primera escena de un módulo o cambio de tema. Un ícono o logo héroe + 2–4 palabras.
- **Horizontal:** ícono 20u sobre el título `display`, centrado.
- **Vertical:** igual, ocupando ≥ 75 % del ancho útil.
- **Nota:** por defecto los clips **no** llevan tarjeta de gancho; esta plantilla se usa si el módulo empieza explicando un concepto nuevo. Los clips empiezan con la primera frase del módulo.

### T1 · `Hero` — un objeto, una idea
- **Uso:** presentar un concepto con un objeto protagonista (un archivo, un paquete, una llave, un candado, una terminal).
- **Reglas:** héroe ≥ 50 % del alto útil (horizontal) o ≥ 60 % del ancho útil (vertical). Hasta 3 satélites a ≥ 40 % del tamaño del héroe.

### T2 · `Flow` — proceso lineal de 3–6 pasos
- **Datos:** `nodes[]` (id, icono, etiqueta 1–2 palabras), `edges[]`.
- **Horizontal:** fila; los nodos se dimensionan para que la fila ocupe ≥ 85 % del ancho útil. Con más de 4 nodos, ajusta tamaño o usa dos filas en serpiente.
- **Vertical:** columna de ≤ 4 nodos; con más, la cámara baja siguiendo el foco o se agrupan pasos.
- **Flechas:** trazo ≥ 0.6u, terminan en el borde del nodo. Una señal (punto o pulso) viaja por la flecha **cuando el autor nombra ese paso**.

### T3 · `Compare` — A vs B / antes vs después
- **Horizontal:** dos paneles lado a lado, cada uno ≥ 42 % del ancho útil.
- **Vertical:** A arriba y B abajo, cada uno ≥ 40 % del alto útil.
- **Encabezados:** 1–2 palabras. Contenido real en ambos lados (código, flujo, resultado). Un ícono de veredicto opcional (✓/✗ como forma, no como emoji).

### T4 · `Grid` — cuadrícula de logos o ejemplos
- **Horizontal:** 3×2 o 4×2; logos 14–16u.
- **Vertical:** 2×3; logos ~16–18u. Máximo 6 por pantalla; si hay más, páginas de 6 sincronizadas con la voz.
- **Reglas:** todos del mismo tamaño y tratamiento; nombre bajo cada logo (`label`) solo si el logo por sí solo no basta. Orden aleatorio **fijo** (no alfabético ni por popularidad) para no sugerir ranking.

### T5 · `Panel` — código, terminal, diff, JSON, chat, árbol de archivos
- **Uso:** mostrar contenido real en detalle.
- **Horizontal:** panel ≥ 70 % del ancho útil. **Vertical:** panel al 100 % del ancho útil.
- **Líneas visibles:** ≤ 12 en horizontal y ≤ 8 en vertical, con fuente ≥ 3u (ideal 3.4u en vertical).
- **Cámara:** hace zoom en las líneas relevantes en el momento en que se nombran; el resto se atenúa.
- **Contenido:** sale de `data/<video-id>/fixtures/` (ver `ejemplos-visuales.md`).

### T6 · `Action` — escribir / editar / ejecutar (o acciones similares)
- **Uso:** el autor describe acciones de una herramienta.
- **Diseño:** una acción a la vez, a casi pantalla completa; una fila de 3 íconos de 8u (escribir, editar, ejecutar) marca cuál está activa.
  - **escribir:** aparece un archivo nuevo en el árbol (`FileTree`).
  - **editar:** la cámara entra en un `DiffView` con líneas verdes y rojas reales.
  - **ejecutar:** la cámara entra en una `Terminal` con comando y salida real.
- **No** pongas los tres paneles chicos a la vez: eso reproduce el error del primer video.

### T7 · `Cycle` — bucle de 4–5 pasos
- **Uso:** ciclos (leer → planear → actuar → verificar, petición → respuesta → reintento).
- **Reglas:** diámetro del círculo ≥ 90 % del alto útil (horizontal) o ≥ 90 % del ancho útil (vertical). Nodo activo resaltado; flecha orbital que avanza al nombrar cada paso. En el centro, el objeto del ciclo (ícono de 12u o más).
- **Límite de radio:** los nodos se colocan como máximo a **30 %** del contenido respecto del centro. Si se acercan al 40 %, en vertical los nodos laterales se cortan. El anillo decorativo puede seguir al 90 % del mínimo, pero los nodos no.

### T8 · `Hub` — un centro con satélites
- **Uso:** "una cosa conectada con otras" (agente ↔ herramientas, servidor ↔ servicios).
- **Horizontal:** centro ≥ 20u con 3–5 satélites en elipse que llene el ancho útil.
- **Vertical:** centro a media altura y satélites alternando lados y alturas dentro del ancho útil (≤ 4).
- **Conectores:** cada satélite se conecta con el centro, no con el vacío.
- **Uso reservado:** `Hub` es para una relación centro-satélites (por ejemplo MCP). No lo reutilices para procesos secuenciales; para eso están `Flow`, `Cycle`, `Tree` o `Stack`.

### T9 · `Boundary` — una cosa no toca a la otra
- **Uso:** mostrar un límite o una intermediación (modelo → harness → proyecto).
- **Horizontal:** tres tarjetas anchas apiladas; 130u de ancho; barrera roja entre el centro y el elemento bloqueado.
- **Vertical:** las mismas tres tarjetas a **72u**; nunca 78u.
- **Regla:** la barrera es visual y no debe confundirse con un conector normal; usa rojo y un candado.

### T10 · `ToolBelt` — herramientas de un harness
- **Uso:** presentar las herramientas que un harness presta al modelo.
- **Horizontal:** harness de 60u arriba; tres herramientas de 36u en una fila con separadores.
- **Vertical:** harness y herramientas de **72u** en columna.
- **Diferencia con `Hub`:** aquí las herramientas forman un cinturón/fila, no satélites alrededor de un centro.

### T11 · `Tree` — un padre y varios hijos
- **Uso:** ramificación real (harness → subagentes, tarea → subtareas).
- **Horizontal:** raíz 110u; hijos 100u; tronco ortogonal a la izquierda y ramas que terminan en el borde de cada tarjeta.
- **Vertical:** raíz **72u**; hijos **64u**; las ramas no entran en las tarjetas atenuadas.
- **Regla:** nada de líneas diagonales que atraviesen tarjetas; usa tronco + ramas horizontales.

### T12 · `Stack` — tres piezas que se suman
- **Uso:** reglas → skill → memoria, o cualquier secuencia de tres piezas de contexto.
- **Horizontal:** tres tarjetas de 30u en fila; la cámara encuadra la fila.
- **Vertical:** tres tarjetas de **72u** en columna.
- **Regla:** una tarjeta activa por vez; las otras al ~55 %.

## 4. Elección y variedad

- Elige la plantilla por **la forma de la idea**: ¿proceso? Flow. ¿ciclo? Cycle. ¿dos cosas contrapuestas? Compare. ¿ejemplos de una categoría? Grid. ¿detalle de contenido? Panel. ¿acciones? Action. ¿una cosa y su entorno? Hub o Hero. ¿un límite? Boundary. ¿herramientas? ToolBelt. ¿ramificación? Tree. ¿tres piezas que se suman? Stack.
- No repitas la misma plantilla más de 2 escenas seguidas.
- Si ninguna encaja, propón una plantilla nueva en el storyboard (con layout horizontal y vertical y reglas de llenado) y espera aprobación antes de programarla.

## 5. Elemento recurrente (hilo conductor)

- Un ejemplo que atraviesa varias escenas (un mismo prompt, un mismo proyecto) ayuda a entender. Se muestra **cuando es relevante**, a tamaño `label` o mayor, nunca como un chip diminuto fijo en una esquina.
- Cada módulo debe poder entenderse solo: si el hilo conductor aparece en un módulo, se vuelve a presentar dentro de ese módulo (en su primera escena).
