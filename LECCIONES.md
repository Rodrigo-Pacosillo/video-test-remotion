# LECCIONES.md — errores reales ya cometidos

Lectura **obligatoria** antes de programar escenas. Cada lección es un error que ya ocurrió: no lo repitas.

## Cómo mantener este archivo
- Cuando el autor señale un fallo recurrente, **propón** una entrada nueva (ID, síntoma, causa, regla, cómo se verifica) y espera su visto bueno.
- Máximo ~20 lecciones vigentes. Si una regla ya la impone el código (`Text`, `Stage`, `npm run check`) o está bien cubierta en `design-system.md`, déjala resumida en una línea o retírala.
- Redacta cada lección como **regla comprobable**, no como consejo vago.

## Primer video (explicación de un harness de agentes, horizontal 16:9, ~104 s)

### L-001 · Todo muy pequeño, cuadro casi vacío
- **Síntoma:** terminal, tarjetas y barras ocupaban ~15–30 % del ancho (el 70 % del cuadro vacío); la única escena que llenaba bien era el círculo final.
- **Causa:** centrar elementos sin una regla de llenado ni cámara.
- **Regla:** llenado ≥ 60 % de ancho y ≥ 45 % de alto en horizontal (≥ 75 % y ≥ 40 % en vertical), en todo momento; la cámara (`Stage`) reencuadra al foco.
- **Verificación:** `npm run check` (bbox del contenido).

### L-002 · Textos ilegibles
- **Síntoma:** etiquetas de logos, "CONTEXTO", "HARNESS", "leer/editar/ejecutar" de ~9–11 px a 1080p; en celular no se leen.
- **Regla:** `label` 4u (mín. 3.5u), nada bajo 3u; logos 14–18u.
- **Verificación:** lint de tamaños + revisión de stills.

### L-003 · Etiquetas de sección diminutas en la esquina
- **Síntoma:** "SUBAGENTES", "PERMISO", "HOOK", "PAQUETE" arriba a la izquierda, lejos de la acción.
- **Regla:** si la escena necesita título, es `title` (6.5u), máx. 3 palabras, integrado en la composición. Si no hace falta, no existe.

### L-004 · Líneas atravesando textos y yendo al vacío
- **Síntoma:** conectores tachando "agente" y "MCP"; líneas que terminaban en la nada.
- **Regla:** conectores detrás del texto, terminando en el borde de un nodo; toda línea une dos elementos reales; etiquetas con fondo propio.
- **Verificación:** revisión visual (pregunta explícita en `verificacion.md`).

### L-005 · Elementos cortados o pegados al borde
- **Síntoma:** el chip del prompt y la etiqueta "BUCLE" pegados al borde superior, parcialmente fuera de la zona útil.
- **Regla:** nada a menos de 4u del borde de la zona segura; nada cortado por el cuadro.
- **Verificación:** `npm run check` (distancia a bordes).

### L-006 · Composición desbalanceada
- **Síntoma:** prompt a la izquierda e íconos a la derecha con un hueco enorme; "proyecto" pegado al borde derecho; candado flotando solo; barra de contexto abajo, desconectada.
- **Regla:** centro del contenido a ±8 % (horizontal) y ±10 % (vertical) del centro de la zona segura; usar plantillas.

### L-007 · Relleno en vez de contenido
- **Síntoma:** barras grises "simulando" código y texto en el panel de reglas y en el diff.
- **Regla:** código, terminal, diffs y datos son reales, correctos y legibles (`fixtures/`). Sin modo placeholder en los componentes.

### L-008 · Spinner como símbolo del "modelo"
- **Síntoma:** un ícono de carga representaba al modelo en varias escenas; genérico y ambiguo.
- **Regla:** el modelo se muestra con su logo (si es un ejemplo) o con su entrada y salida reales. Nada de spinners como símbolo.

### L-009 · Escenas casi vacías
- **Síntoma:** un candado minúsculo o un archivo pequeño en una pantalla vacía durante varios segundos.
- **Regla:** cada escena tiene un héroe a escala (≥ 50 % del alto útil) o usa la cámara para acercarlo.

### L-010 · Superficies que se funden con el fondo
- **Síntoma:** cajas gris oscuro sobre fondo oscuro con texto tenue.
- **Regla:** superficie con relleno ≥ 1.25:1 y borde ≥ 2:1 frente al fondo; texto principal ≥ 7:1 y secundario ≥ 4.5:1.

### L-011 · Neón y brillo en todo
- **Síntoma:** casi todos los elementos con glow cian, sin jerarquía.
- **Regla:** un solo elemento en foco con brillo; el resto atenuado al ~55 %.

### L-012 · Calidad y compresión
- **Síntoma:** se evaluó la calidad con una copia recomprimida por WhatsApp.
- **Regla:** estándar 1080p/30 fps; borradores con `--scale=0.5`; el render original se sube a YouTube; no se juzga la nitidez por copias recomprimidas.

### L-013 · La misma plantilla para ideas distintas
- **Síntoma:** a 0:22 y 0:31 el video cambia de tema pero la forma visual es casi idéntica (mismo hub, solo cambian las etiquetas); el corte no se percibe como una idea nueva.
- **Causa:** reutilizar una plantilla por comodidad en lugar de elegir la forma de la idea.
- **Regla:** una plantilla no se repite para ideas de forma distinta; máximo dos escenas seguidas y nunca como “la misma caja con otras letras”. Cada cambio de idea debe cambiar la silueta, la distribución o la metáfora visual.
- **Verificación:** revisión de stills consecutivos en `out/check/<video-id>/sheet-16x9.png` y `sheet-9x16.png`; si dos beats seguidos se ven iguales, se rediseña uno.

### L-014 · Chrome de terminal para conceptos que no son terminal
- **Síntoma:** la caja con barra de ventana y puntos se usó para prompts, contexto, reglas, permisos, plugin y cierre; el video parecía una sucesión de terminales aunque el concepto no fuera código.
- **Causa:** `Window` era el contenedor por defecto.
- **Regla:** el chrome de ventana/terminal se reserva para código, terminal, diff o árbol de archivos. Prompts, contexto, documentos, permisos y paquetes usan su propia metáfora (`PromptBar`, `ContextStack`, `DocumentCard`, `DialogCard`, `PackageBox`).
- **Verificación:** lint de uso de `Window` limitado a `CodeBlock`, `Terminal`, `DiffView` y `FileTree`, más revisión visual de las hojas de contacto.
