# Formatos 16:9 y 9:16

Guía de adaptación entre horizontal y vertical. Se lee antes de proponer un storyboard o programar escenas, junto con `design-system.md` y `plantillas-escena.md`.

## 1. Principio

Una sola fuente: el mismo audio, guion, storyboard, fixtures y componentes. Lo único que cambia entre formatos es el **layout**.

Prohibido:

- Recortar o hacer zoom central del horizontal para obtener el vertical.
- Duplicar escenas por formato (`Scene01Horizontal`, `Scene01Vertical`).
- Cambiar el contenido, los datos o el orden de los beats entre formatos.

Permitido:

- Cambiar fila por columna, ancho, foco de cámara, número de elementos visibles y tamaño mínimo de código.
- Un override puntual dentro de la misma escena, reutilizando los mismos datos, cuando el layout automático no alcance.

## 2. Números reales

`u = min(ancho, alto) / 100 = 10.8 px` en ambos formatos.

| Formato | Zona segura | Contenido útil (tras inset de 4u) | Ancho máximo de componente |
|---|---|---|---|
| Horizontal 1920×1080 | 160u × 90u | **152u × 82u** | **150u** |
| Vertical 1080×1920 | 82u × 124.4u | **74u × 116.4u** | **72u** |

El contenido útil es la zona segura menos **4u por lado** (`Background` ya aplica ese inset). En vertical, un componente de 78–82u se sale del contenido y se corta por la derecha; por eso el máximo práctico es **72u**.

Regla para componentes con ancho explícito (`widthU`, `width` fijo, `minWidth`, tarjetas): respetar **72u en vertical** y **150u en horizontal**. Si una etiqueta o un código no cabe, se acorta el texto, se pagina, se cambia la distribución o se reduce la fuente hasta el mínimo permitido; nunca se recorta.

## 3. Qué puede cambiar y qué no

| Puede cambiar | No puede cambiar |
|---|---|
| `flexDirection` fila/columna | Los datos de la escena |
| Ancho de tarjetas y nodos | El orden de los beats |
| Foco de cámara (`Stage`) | El audio o sus tiempos |
| Tamaño de código: 3.4u horizontal, 3u vertical como mínimo | El contenido de los fixtures |
| Cuadrícula de logos: 6 en horizontal, 4 en vertical | La identidad visual (colores, tipografía) |
| Resumen de piezas: 6 en horizontal, 4 + 2 en vertical | Escenas duplicadas por formato |

Si un cambio solo tiene sentido en un formato, se documenta como override de orientación y se reutilizan los mismos datos. No se crea una segunda escena.

## 4. Matriz de componentes y plantillas

| Componente / plantilla | Horizontal | Vertical | Nota |
|---|---|---|---|
| `PromptBar` | Texto 3.4u, ancho 100% | Texto **3u**, ancho 100% | En vertical 3.4u no cabe en 74u |
| `ContextStack` | Bloques + medidor lateral | Igual, contenido envuelve | Ancho 100%; no fijar 78u |
| `DocumentCard` | Ancho 100% | Ancho 100% | Sin chrome de ventana |
| `DialogCard` | 56u de ancho, 30u de alto mínimo | **72u** de ancho, 50u de alto mínimo | Sin chrome de ventana |
| `PackageBox` | Ítems en fila | Ítems en columna | Ancho 100%; sin chrome de ventana |
| `Node` | `widthU` ≤ 150u | `widthU` ≤ 72u | Altura mínima 9u; icono mínimo 5u |
| `LogoGrid` | 6 logos, 3 columnas | 4 logos, 2 columnas | Logos 16u; nombres solo si caben |
| `Window` | Código, terminal, diff, árbol | Igual | **No** usar para prompt, contexto, reglas, permiso o plugin |
| `Boundary` | 130u, pila modelo→harness→proyecto | **72u**, misma pila | Barrera roja entre harness y proyecto |
| `ToolBelt` | Harness 60u; herramientas de 36u en fila | Harness y herramientas de **72u** en columna | Distinto de `Hub` |
| `Tree` | Raíz 110u; hijos 100u | Raíz **72u**; hijos **64u** | Tronco ortogonal; ramas al borde |
| `Stack` | 3 tarjetas de 30u en fila | 3 tarjetas de **72u** en columna | Cámara horizontal sobre la fila |
| `Cycle` | Radio hasta 30% del contenido | Radio máximo **30%** | El anillo sigue al 90% del mínimo |
| `Hub` | Centro + satélites | Centro + 4 satélites | Reservado para una relación centro-satélites, no para procesos |
| `Action` | 3 acciones + panel | 3 acciones + panel apilado | Diff y árbol sí usan `Window` |

## 5. Errores concretos ya corregidos

| Momento | Síntoma | Causa | Corrección |
|---|---|---|---|
| **4 s** | El final del prompt se cortaba en vertical | Texto a 3.4u en un ancho útil de 74u | Texto a **3u** en vertical |
| **18 s** | Borde derecho de `Boundary` cortado | Tarjetas de 78u | **72u** |
| **22 s** | Borde de `ToolBelt` cortado | Centro y herramientas de 78u | **72u** |
| **31 s** | “verificar” y “planear” cortados; árbol con etiquetas truncadas | Radio del ciclo ~40%; tarjetas demasiado anchas | Radio máximo **30%**; raíz 72u, hijos 64u, tronco ortogonal |
| **35 s** | Diálogo cortado y primer frame casi vacío | 82u y `Stage` empezando en opacidad 0 | **72u** y entrada `0.65 + 0.35 * spring` |
| **44 s** | Tarjetas de `Stack` cortadas | 78u | **72u** |

## 6. Checklist antes de previsualizar

- [ ] Ningún componente con ancho explícito supera **72u en vertical** ni **150u en horizontal**.
- [ ] Stills en el **inicio de cada beat** y un frame después, en ambos formatos.
- [ ] El primer frame de cada beat tiene contenido; no hay corte vacío.
- [ ] Ningún texto, borde, logo o cursor queda cortado.
- [ ] El código cabe o envuelve de forma legible; no se parte una palabra a la mitad.
- [ ] Los conectores terminan en el borde de un nodo y no atraviesan tarjetas atenuadas.
- [ ] El cursor cae sobre el botón o zona correcta.
- [ ] `npm run check` sin FAIL; WARN revisados.
- [ ] Hojas de contacto `sheet-16x9.png` y `sheet-9x16.png` revisadas.
- [ ] No hay escenas duplicadas por formato ni contenido distinto entre ambos.

## 7. Cómo aplicarlo a un video nuevo

1. Copia la estructura de beats y los fixtures, no el diseño de otra escena.
2. Elige la plantilla por la forma de la idea (`Flow`, `Cycle`, `Hub`, `Boundary`, `ToolBelt`, `Tree`, `Stack`, `Action`, `Panel`, `Grid`).
3. Define los anchos con `u`, no con px. En vertical parte de 72u como máximo.
4. Si algo no cabe, reduce el ancho, pagina o cambia la distribución; no recortes.
5. Revisa los dos formatos antes de dar la escena por terminada.
6. Si aparece un fallo nuevo, propón una entrada para `LECCIONES.md`.

## 8. Documentos relacionados

- [Sistema de diseño](./design-system.md)
- [Plantillas de escena](./plantillas-escena.md)
- [Componentes](./componentes.md)
- [Verificación](./verificacion.md)
- [Pipeline](./pipeline.md)
- [Lecciones](../LECCIONES.md)
