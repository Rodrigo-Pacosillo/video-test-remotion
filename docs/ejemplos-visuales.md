# Inteligencia visual: ejemplos concretos, reales y nada genéricos

El autor habla de conceptos, a veces de forma genérica. **Tu responsabilidad es decidir qué mostrar para que el concepto se entienda, aunque el guion no lo pida.** Y lo que muestres debe parecer real: un programador debe reconocerlo como algo que existe, no como un diagrama de relleno.

## 1. Qué hacer en cada escena

Antes de proponer visuales:
1. Identifica **cosas concretas** mencionadas (herramientas, modelos, protocolos, ataques, empresas, comandos).
2. Identifica **términos genéricos o abstractos** ("modelos", "un harness", "un agente", "una base de datos", "una vulnerabilidad", "un protocolo de cifrado").
3. Para cada término genérico, **elige ejemplos concretos y representativos** y decide cómo mostrarlos.
4. Si el autor describe una **acción** (escribir, editar, ejecutar, leer, enviar, descifrar), **anímala**; un texto no basta.
5. Elige la **plantilla** adecuada (`plantillas-escena.md`) y el contenido real que la llena.

## 2. Ejemplos de razonamiento esperado (orientativos)

Los nombres son ejemplos de ejemplos: **verifica qué existe y qué es vigente** (sección 3).

| El autor dice | Tú muestras |
|---|---|
| "Hay muchos modelos…" | `Grid` de logos de varios modelos/proveedores actuales de distintas familias (propietarios y abiertos), mismo tamaño y tratamiento |
| "Un harness se encarga de…" | `Cycle` del bucle (entrada → modelo → herramienta → resultado → vuelta al modelo) y, aparte, ejemplos reales de harnesses (agentes de código en terminal o IDE) |
| "El harness escribe, edita y ejecuta" | `Action`: árbol de archivos con un archivo nuevo, diff real con líneas rojas/verdes, terminal con comando y salida reales |
| "Un ataque de inyección…" | `Flow` petición → servidor → base de datos, con la petición real mostrada (`GET /users?id=1' OR '1'='1`) y el punto de inyección resaltado; dominio ficticio |
| "El cifrado asimétrico…" | `Hub` o `Flow` con par de claves y candados, y un caso real (el candado de HTTPS, una conexión SSH) |
| "Esto se despliega en la nube" | `Grid` de logos de varios proveedores como ejemplo, no como recomendación |
| "El modelo recibe un contexto limitado" | Un contenedor que se llena con bloques reales (mensaje del sistema, archivos, historial) y se desborda; el contenido de cada bloque es reconocible, no un cuadrado de color |

No te limites a esta tabla: aplica el mismo razonamiento a cualquier tema.

## 3. Investiga y verifica (no uses solo memoria)

IA y software cambian muy rápido. Antes de elegir ejemplos:
- **Busca en la web** (si tienes acceso) qué herramientas, modelos o versiones están vigentes y son representativos hoy.
- Sin internet: **dilo** y propón ejemplos con `verified: false` para que el autor los revise.
- No muestres versiones concretas ("modelo X v3") salvo que el autor las mencione o las hayas verificado.
- No inventes funcionalidades. Si muestras qué hace una herramienta, debe ser algo que realmente hace.
- Cada ejemplo con nombre queda en el storyboard con `verified` y `source` (búsqueda y fecha).

## 4. Realismo: reglas para que no se vea genérico

### 4.1 Regla de especificidad
**Cada elemento en pantalla lleva contenido específico.** Prueba: ¿se entiende qué es sin leer una etiqueta? ¿Podría estar en cualquier otro video del canal sin cambiar nada? Si sí, es genérico: reemplázalo.

### 4.2 Contenido real en vez de relleno
- **Código:** 3–10 líneas **reales**, correctas y con resaltado de sintaxis (tokenizador real; propón `shiki` o `prism-react-renderer` avisando antes de instalar). Nunca barras grises.
- **Terminal:** prompt con directorio y rama (`~/proyecto (main) $`), comando real, salida real (versiones solo si son verificables o de ejemplo evidente), cursor que parpadea.
- **Diff:** nombre de archivo real, números de línea, 2–4 líneas añadidas y 1–2 eliminadas con sentido.
- **Peticiones y datos:** cabeceras HTTP, JSON, logs con nivel y marca de tiempo, `curl` con su respuesta. Tokens y claves **siempre enmascarados** (`sk-••••`, `ghp_••••`).
- **Árbol de archivos:** una estructura de proyecto creíble (`src/`, `package.json`, `.env`), con íconos distintos por tipo de archivo y más de 3 archivos.
- **Chat:** mensajes cortos y plausibles de usuario y modelo, con avatares y marca de rol.
- **Datos de red/seguridad:** dominios y direcciones ficticias (`example.com`, `192.0.2.x`), puertos y rutas reales de ejemplo.

### 4.3 Fixtures: el contenido vive en `data/`
- El contenido real se escribe en `data/<video-id>/fixtures/` (archivos de código, sesiones de terminal, diffs, JSON, conversaciones) y las escenas lo importan.
- Así se puede revisar la corrección técnica sin tocar escenas y traducir/ajustar sin tocar código.
- Cada fixture: correcto, breve, con comentario de qué ilustra. Si es pseudocódigo, se indica.

### 4.4 Interfaces creíbles pero originales
- No copies capturas de pantalla de terceros ni imites una interfaz concreta al detalle. Recrea una **versión genérica creíble** con componentes propios: marco de ventana con botones, barra de título con nombre de archivo, scroll, selección, cursor con clic, estados hover.
- Detalles que dan realismo: sombras sutiles y consistentes, tipografía mono real en código, tiempos de escritura naturales (20–40 caracteres/s con variación **determinista** usando `random(seed)` de Remotion; nunca `Math.random`), pausas al ejecutar un comando, indicador de progreso con valores plausibles.

### 4.5 Metáforas concretas en vez de cajas con flechas
- No todo es "caja → flecha → caja". Cuando el concepto tenga forma física, úsala: un contenedor que se llena, una llave que abre un candado, un paquete que se desempaca, una tubería por la que pasa un dato.
- **Una metáfora por concepto y consistente** durante todo el video.
- El "modelo" no se representa con un spinner ni un engranaje de carga: usa el logo del modelo (si es un ejemplo concreto) o su entrada y su salida reales (el prompt entra, el texto sale).

### 4.6 Hilo conductor con un caso real
- Sigue **un caso concreto** a lo largo de las escenas (por ejemplo, un prompt real, un archivo real, una petición real) en lugar de ejemplos desconectados. Presenta de nuevo el caso en cada módulo (ver `plantillas-escena.md`, sección 5).

### 4.7 Escala y detalle
- Muestra la cosa **real y a tamaño legible**: mejor un diff de 4 líneas que llena el cuadro que un editor entero ilegible. Usa la cámara para acercar al detalle que importa.
- Lo que el autor nombra, se ve al nombrarlo. Lo que no importa en ese instante se atenúa.

### 4.8 Variedad y ritmo visual
- Alterna planos amplios (el sistema completo) y planos de detalle (una línea, un campo, un botón).
- No repitas la misma plantilla más de 2 escenas seguidas.
- Ningún elemento permanece quieto más de ~4 s sin un cambio mínimo (resaltado, avance de cursor, señal por una flecha) que mantenga la atención, sin movimiento ambiental constante.

### 4.9 Prueba de realismo (antes de entregar cada escena)
- ¿Un programador reconocería esto como real?
- ¿Hay alguna barra gris, spinner, lorem ipsum o placeholder?
- ¿Algún texto es una frase que debería decir la voz?
- ¿Puedo explicar la escena en una frase mirando solo el fotograma?

## 5. Cómo mostrarlo en la práctica

- **Logos:** `Logo`/`LogoGrid` con el registro `src/logos.ts`. Fuentes: `@lobehub/icons-static-svg` (IA/LLM, proveedores, varias herramientas de agentes) y `simple-icons` (tecnología general). Copia solo los SVG usados a `public/assets/logos/`.
- **Sin logo oficial disponible:** chip de texto estilizado con el nombre (`NameChip`). No dibujes ni imites un logo.
- **Interfaces de producto:** versión simplificada genérica con `Terminal`, `FileTree`, `DiffView`, `ChatBubble`, `ToolCallCard`, o material que entregue el autor.
- **Acciones:** `FileTree`, `DiffView`, `Terminal`, `ToolCallCard` para que el espectador *vea* qué ocurre.
- **Ritmo:** el ejemplo aparece cuando el autor dice el concepto (ancla a palabras de `words.json`).

## 6. Límites y buen criterio

- **Ilustrativo, no editorial.** Logos y nombres son *ejemplos*, con mismo tamaño y estilo para no sugerir ranking ni recomendación. Si el autor compara o critica algo, pregunta antes de poner el logo.
- **Nunca asocies una marca con una vulnerabilidad, brecha o ataque** salvo que el guion lo diga explícitamente. En ciberseguridad usa nombres y dominios ficticios.
- No modifiques, recortes ni recolorees logos más allá de lo que permita su paquete (versión clara/oscura). Son marcas de sus dueños.
- **No sobrecargues.** Máximo un ejemplo nuevo importante por idea. Si dudas entre añadir o no, pregunta o propón ambas opciones.
- **Todo visual inferido se marca en el storyboard** para que el autor lo apruebe, cambie o elimine.
