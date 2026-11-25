# Guion Video 1: El recorrido de un prompt

Solo voz en off. Las indicaciones [VISUAL] son para el editor. Todo el video sigue un solo prompt de principio a fin.

## Gancho

**VOZ:**
Escribo una línea, doy enter, y un sistema entero se pone a trabajar. Veamos qué hay detrás de ese enter.

**[VISUAL]** El prompt "agrega login con Google a mi app" escrito en una terminal. Se queda en pantalla y de ahí parte todo el recorrido.

## Modelos

**VOZ:**
Tu texto llega primero al modelo, la IA que razona y escribe código. Pero solo ve lo que cabe en su ventana de contexto, y eso es un límite que condiciona todo lo demás.

**[VISUAL]** Logos de modelos. Barra de contexto con el prompt ocupando un pedacito.

## Harness

**VOZ:**
El modelo no puede tocar tu proyecto. Quien lo hace es el harness, que le presta herramientas para leer, editar y ejecutar. Corre el bucle: leer, planear, actuar, verificar. Si la tarea es grande, reparte el trabajo entre subagentes. Y antes de ejecutar algo delicado, te pide permiso.

**[VISUAL]** Bucle girando. Subagentes ramificándose. Ventana de "¿permitir este comando?" con el cursor aprobando.

## Contexto e instrucciones

**VOZ:**
Antes de escribir una línea, el agente ya cargó contexto. Lee el archivo de reglas de tu proyecto: tu stack, tus convenciones. Activa una skill con el procedimiento exacto para autenticación. Y recuerda en su memoria que prefieres cierta librería, porque se lo dijiste hace semanas.

**[VISUAL]** Tres tarjetas aparecen sobre la barra de contexto: reglas, skill, memoria, cada una sumando un poco.

## MCP

**VOZ:**
Para configurar el login necesita datos que no están en tu código. Por MCP se conecta a tu repositorio, a la base de datos y a la consola de Google.

**[VISUAL]** Servicios externos conectándose al agente.

## Hooks

**VOZ:**
Edita archivos. Cada vez que guarda uno, se dispara un hook: se formatea el código y corren los tests, sin que nadie se lo pida. Intenta borrar algo que no debía, y otro hook lo bloquea.

**[VISUAL]** Archivo guardado, check verde de formato y tests. Un comando en rojo bloqueado.

## Plugins

**VOZ:**
Y todo ese flujo (skills, conexiones, hooks) puede venir ya armado en un solo paquete instalable. Eso es un plugin.

**[VISUAL]** Caja con los íconos de las piezas anteriores y botón de instalar.

## Cierre

**VOZ:**
Modelo, harness, contexto, MCP, hooks y plugins, todo para una sola línea. Ahora vamos pieza por pieza, empezando por la que decide cuánto puede hacer todo lo demás: el modelo.

**[VISUAL]** El login funcionando y las seis piezas resaltándose en orden. La última, el modelo, queda iluminada como puente a la siguiente sección.

## Notas de edición

- **Corte corto:** quitar la última frase del cierre ("Ahora vamos pieza por pieza...") y terminar en "...todo para una sola línea".
- **Video largo:** la última frase del cierre funciona como puente a la sección de modelos. Si cambias el orden o añades secciones, solo ajusta esa frase.
- **Ejemplo del prompt:** el login con Google toca todas las piezas de forma natural. Si lo cambias por otro caso, adapta los ejemplos de reglas, skill y MCP en consecuencia.
