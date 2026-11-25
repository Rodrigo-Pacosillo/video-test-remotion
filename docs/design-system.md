# Sistema de diseño

Documento más importante para la calidad visual. Todas las cifras se implementan en `src/theme.ts` y `src/layout.ts`; las escenas **no** definen tamaños propios.

Por qué existe: el primer video salió con elementos diminutos, textos ilegibles y gran parte del cuadro vacío. Los adjetivos ("grande", "limpio") no se pueden verificar; los números sí.

## 1. Unidad y escala

- `u = min(width, height) / 100`. Con 1920×1080 y con 1080×1920 vale **10.8 px**, así que los tamaños se ven iguales en ambos formatos.
- Prohibido el uso de px fijos dentro de escenas y componentes. Todo es múltiplo de `u` o porcentaje de la zona segura.

### Escala tipográfica (única permitida)

| Token | Tamaño | Uso |
|---|---|---|
| `display` | 9u (~97 px) | título de módulo o de escena de impacto (2–4 palabras) |
| `title` | 6.5u (~70 px) | título de escena |
| `label` | 4u (~43 px), mínimo 3.5u | etiquetas de nodos, logos, acciones |
| `caption` | 3.2u (~35 px) | solo texto secundario |
| `code` | 3u mínimo (~32 px), ideal 3.4u | código, terminal, diff |

**Nada por debajo de 3u.** Si el texto no cabe, se acorta, se agrupa o se muestra menos; nunca se reduce.

### Tamaños de elementos

- Logos e íconos de herramienta: **14–18u** (~150–195 px). En cuadrículas densas, mínimo 12u.
- Ícono dentro de un nodo: ≥ 5u.
- Nodos con etiqueta: alto ≥ 9u.
- Trazo de flechas y conectores: ≥ 0.6u.
- Separación entre elementos: ≥ 2u. Entre ícono y su etiqueta: ≥ 1u.

## 2. Zona segura y llenado

### Zonas seguras (valores iniciales, viven en `theme.ts`)

| Formato | Arriba | Abajo | Izquierda | Derecha |
|---|---|---|---|---|
| Horizontal | 5 % | 5 % | 5 % | 5 % |
| Vertical | 10 % | 20 % | 6 % | 12 % |

Verifica las guías vigentes de cada plataforma y ajusta solo `theme.ts`.

### Regla de llenado

Se mide sobre el **bounding box del contenido visible** (sin el fondo) respecto a la zona segura:

| Formato | Ancho mínimo | Alto mínimo |
|---|---|---|
| Horizontal | 60 % | 45 % |
| Vertical | 75 % | 40 % |

### Ancho útil real

Con `u = 10.8 px` y el inset de 4u que aplica `Background`, el contenido útil es:

| Formato | Zona segura | Contenido útil | Ancho máximo de componente |
|---|---|---|---|
| Horizontal | 160u × 90u | **152u × 82u** | **150u** |
| Vertical | 82u × 124.4u | **74u × 116.4u** | **72u** |

Cualquier componente con ancho explícito (`widthU`, `width` fijo, tarjetas, nodos) debe respetar ese máximo. En vertical, 78–82u se sale del contenido y se corta por la derecha. El detalle de adaptación por formato está en [formatos-16x9-9x16.md](./formatos-16x9-9x16.md).

- **Centrado:** el centro del bbox queda a ±8 % (horizontal) y ±10 % (vertical) del centro de la zona segura. Excepción: plantillas que declaran zona de título.
- **Bordes:** nada a menos de 4u del borde de la zona segura; nada cortado por el cuadro.
- La regla se cumple **en todo momento de la escena**, no solo al final. Se exceptúan los primeros 0.7 s (entrada) y los últimos 0.5 s (salida).

### Cómo se cumple mientras los elementos van apareciendo: la cámara

El fallo típico es colocar todo en su posición final y dejar los primeros segundos casi vacíos. La solución es una **cámara de escena** (`Stage`):

1. Cada plantilla calcula posiciones y tamaños con **funciones puras** (sin medir el DOM), así el bbox de cualquier subconjunto de elementos es conocido.
2. El storyboard lista, por instante, qué elementos están en foco (`camera: [{t, focus: [...]}]`).
3. `Stage` encuadra el bbox de esos elementos para llenar la zona segura (escala + traslación) y anima el cambio con `spring` al aparecer cada elemento nuevo.
4. Resultado: empieza cerca del primer elemento (llena el cuadro) y se aleja a medida que se suman los demás. Para mostrar un detalle (líneas de un diff, un campo de JSON), la cámara **hace zoom** en vez de dejar un panel pequeño en el centro.
5. Deriva lenta opcional de ≤ 4 % de escala durante la escena para dar vida; nunca debe romper la regla de llenado.

## 3. Texto en pantalla

- El texto es **etiqueta**, no explicación. La explicación la da la voz.
- Etiquetas de 1–3 palabras, preferentemente sustantivos o verbos cortos. Sin frases ni oraciones.
- Máximo **6 etiquetas** por escena en horizontal y **4** en vertical.
- Título de escena opcional, máx. 3 palabras.
- Todo texto pasa por el componente `Text` (escala fija) y proviene de props o de `data/` (para poder traducirlo; ver `futuro-traduccion.md`).
- Excepción: el contenido de código, terminal, diff o JSON es visual y se muestra real, pero con pocas líneas y legible (ver `ejemplos-visuales.md`).
- Subtítulos: **desactivados por defecto**. Si el autor los activa para un video, van en la zona segura inferior, con resaltado palabra a palabra y respetando la escala (`remotion-captions`).

## 4. Color, superficies y contraste

Valores iniciales (editables en `theme.ts`; las reglas de contraste mandan sobre los hex):

| Token | Valor inicial | Notas |
|---|---|---|
| `bg` | `#0B0F17` | fondo |
| `surface` | `#1E2738` | tarjetas, paneles, nodos |
| `border` | `#3A4A66` | trazo de 2 px alrededor de superficies |
| `text` | `#F2F5FA` | texto principal (≥ 7:1 sobre surface) |
| `text2` | `#A9B4C7` | texto secundario (≥ 4.5:1 sobre surface) |
| `cyan` | `#38BDF8` | flujo, activo |
| `green` | `#34D399` | correcto, añadido |
| `red` | `#F43F5E` | eliminado, error, peligro |
| `amber` | `#FBBF24` | permiso, advertencia |
| `violet` | `#A78BFA` | datos, memoria |

Reglas:

- **Significado de color constante dentro de un video** (el verde siempre es "añadido/correcto", el rojo "eliminado/peligro"). No uses color solo como decoración.
- Toda superficie se distingue del fondo con **relleno ≥ 1.25:1 y borde ≥ 2:1**. Prohibido gris oscuro sobre gris oscuro sin borde.
- Máximo 2 colores de acento por escena.
- Logos sobre fondo oscuro: variante adecuada o contenedor claro neutro, **el mismo para todos**.
- Fuentes locales en `public/assets/fonts/` (por ejemplo Inter para interfaz y JetBrains Mono para código, ambas de licencia abierta).

## 5. Fondo

- Un fondo por video, sobrio: color liso o degradado muy suave.
- Sin partículas, cuadrículas visibles, ruido animado ni brillos de ambiente que compitan con el contenido.
- Debe poder **desactivarse** con `checkMode` (fondo liso `bg`) para medir el llenado.

## 6. Foco y jerarquía

- Un solo elemento "encendido" a la vez (brillo, borde de acento, tamaño). Los demás se atenúan al ~55 % de opacidad.
- El brillo/glow se reserva para ese elemento. No pongas glow en todo.
- Entiendes la escena en **3 segundos sin leer**: el elemento héroe se reconoce a primera vista.

## 7. Capas y conectores

- Orden de capas fijo: fondo → conectores → superficies → texto → cursor/resaltados.
- Los conectores terminan en el **borde** del nodo (con 0.5u de separación) y nunca cruzan texto.
- Cada etiqueta que se apoye en un conector lleva fondo propio (píldora con color `bg`/`surface`).
- Un conector siempre une dos elementos reales; no hay líneas que "salgan hacia la nada".

## 8. Movimiento y ritmo

- Todo se anima desde el frame (`interpolate`, `spring`); prohibidos CSS transitions, `setTimeout` y similares.
- Entradas de 10–18 frames con `spring` suave; escalonado de 4–8 frames entre elementos de un grupo.
- Cada elemento aparece **cuando el autor lo nombra** (anclado a una palabra de `words.json`), no antes ni mucho después.
- Mantén cada elemento clave legible al menos **1.5 s** antes del siguiente cambio grande.
- Sin movimiento ambiental constante (pulsos infinitos, partículas): distrae del audio.
- Transiciones entre escenas: una sola familia, sobria y consistente.

## 9. Variedad e identidad

- **Identidad consistente entre videos** (tema, tipografía, colores) y **variedad dentro del video**: no repitas la misma plantilla más de 2 escenas seguidas.
- Varía la escala de la cámara entre escenas (planos amplios y planos de detalle).

## 10. Antipatrones (si lo ves, corrígelo)

- Elementos pequeños centrados con el 70 % del cuadro vacío.
- Etiquetas de sección diminutas en una esquina.
- Líneas que atraviesan texto o terminan en el vacío.
- Elementos pegados o cortados por el borde.
- Barras grises de relleno en lugar de contenido; spinners como símbolo de "modelo" o de "proceso".
- Iconos de estilos mezclados; emojis como íconos.
- Brillo y neón en todos los elementos a la vez.
- Escenas casi vacías con un solo objeto minúsculo.
- Posiciones que "saltan" entre momentos de la misma escena (usa la cámara, no reubiques).
- Más de 6 elementos principales simultáneos en horizontal, o 4 en vertical.
