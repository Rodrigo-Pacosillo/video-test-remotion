# Verificación antes de entregar

Un agente que no mira el resultado cree que quedó bien. Esta verificación sustituye esa creencia por medidas y por revisión visual. Se ejecuta **al terminar cada tanda de escenas** y de nuevo antes del render final.

## 1. Comprobaciones automáticas: `npm run check`

Implementa `scripts/check-visual.mjs` (puedes usar la CLI de Remotion o su API `renderStill`; consulta `remotion-docs` para la sintaxis vigente). Hace dos cosas.

### 1.1 Lint estático (sobre `src/scenes/`, `src/templates/`, `src/components/`)

Falla si encuentra:
- `fontSize` con número literal o valores en px fuera de `theme.ts`/`Text`.
- Cualquier `px` literal para tamaños dentro de escenas (todo debe ser `u` o porcentaje).
- `transition:`, `animation:`, `@keyframes`, `setTimeout`, `setInterval`, `Math.random`, `Date.now`.
- `fetch(`, URLs `http(s)://` en imágenes o fuentes (el render no usa red).
- Texto `lorem`, `placeholder`, `TODO`, `xxx` visible en pantalla.
- Más de 6 etiquetas (horizontal) o 4 (vertical) por escena, o etiquetas de más de 3 palabras.
- Tamaños de la escala por debajo del mínimo (p. ej. `label` < 3.5u, cualquier texto < 3u).

### 1.2 Medición sobre stills

1. Para **cada escena** y **cada orientación** (16:9 y 9:16), renderiza stills con `checkMode` activo (fondo liso `bg`, sin deriva de cámara) en **tres instantes**: 20 %, 50 % y 85 % de la duración de la escena, más un instante tras cada cambio de `camera.focus`.
2. Además, renderiza el **primer frame visible de cada beat** y el frame siguiente. El 20/50/85 % no cubre los cortes entre plantillas ni los primeros frames con fade de `Stage`. Revisa que ningún corte quede vacío y que las etiquetas no estén truncadas.
3. Para cada still, calcula el **bbox del contenido**: píxeles que difieren del fondo por encima de un umbral (≈ ΔRGB > 14), ignorando píxeles aislados menores a ~0.3u.
4. Mide contra la zona segura de esa orientación:

| Métrica | Horizontal | Vertical |
|---|---|---|
| Ancho del bbox / ancho útil | ≥ 60 % | ≥ 75 % |
| Alto del bbox / alto útil | ≥ 45 % | ≥ 40 % |
| Centro del bbox vs. centro útil | ±8 % horiz., ±10 % vert. | ±8 % horiz., ±10 % vert. |
| Distancia a borde de zona segura | ≥ 4u | ≥ 4u |
| Contenido tocando el borde del cuadro | ninguno | ninguno |

5. Estado por still: **PASS**, **WARN** (incumple por menos de 5 puntos) o **FAIL**. Los primeros 0.7 s y los últimos 0.5 s de cada escena se excluyen.
6. Escribe `out/check/<video-id>/report.md` con una tabla por escena y orientación (valores medidos y estado) y genera **hojas de contacto** (`out/check/<video-id>/sheets/`) con todos los stills y su etiqueta (escena, orientación, instante).

### 1.3 Bucle de corrección

- Con algún FAIL: corrige y vuelve a ejecutar. Máximo **3 iteraciones por escena**; si persiste, repórtalo al autor con el motivo.
- Los WARN se corrigen si es barato; si no, se listan en el reporte.
- Ajustar un umbral para "pasar" está prohibido. Si un umbral parece mal, proponlo al autor.

## 2. Revisión visual obligatoria

Los números no detectan todo (solapes, textos cortados, composiciones raras). Después del check automático, aplica también la checklist de [formatos-16x9-9x16.md](./formatos-16x9-9x16.md):

1. **Abre las hojas de contacto** (o los stills) de ambas orientaciones. Si tu entorno no te deja ver imágenes, dilo y entrega las hojas al autor para revisión.
2. Para **cada escena** responde sí/no:
   - ¿Se entiende en 3 segundos sin leer?
   - ¿Hay texto cortado, solapado, fuera de la zona segura o más pequeño que la escala?
   - ¿Algún componente con ancho explícito supera **72u en vertical** o **150u en horizontal**?
   - ¿El primer frame de cada beat tiene contenido, o el corte queda vacío?
   - ¿Alguna línea cruza un texto o termina en el vacío?
   - ¿Hay elementos pegados al borde o escena casi vacía?
   - ¿Los elementos tienen contenido real (sin barras grises ni spinners)?
   - ¿Un solo elemento está "encendido" y el resto atenuado?
   - ¿El vertical conserva la misma idea con menos elementos a la vez?
   - ¿El cursor cae sobre el botón o zona correcta?
3. Revisa `LECCIONES.md`: ¿se repite algún error ya registrado?

## 3. Checklist final

- [ ] `npm run check` sin FAIL (WARN listados).
- [ ] Stills del inicio de cada beat revisados en ambos formatos; ningún corte queda vacío.
- [ ] Ningún componente con ancho explícito supera 72u en vertical ni 150u en horizontal.
- [ ] Revisión visual hecha en 16:9 y en 9:16.
- [ ] La duración de cada composición coincide con su audio (completo o clip).
- [ ] Cada escena y cada ejemplo aparece cuando se menciona su concepto.
- [ ] Los términos genéricos tienen ejemplos concretos y reales; los inferidos están marcados en el storyboard.
- [ ] Los ejemplos con nombre están verificados o marcados `verified: false`.
- [ ] Logos con mismo tamaño y tratamiento, sin alterar, sin asociarlos a incidentes salvo que el guion lo diga.
- [ ] Contenido técnico (código, comandos, datos) revisado en `fixtures/`: correcto o indicado como pseudocódigo; sin secretos reales.
- [ ] No hay escenas duplicadas por formato (salvo overrides puntuales justificados).
- [ ] Cada módulo se entiende solo; los clips coinciden con los límites del guion y su audio está sincronizado con la imagen.
- [ ] Se generó `chapters.txt` con los módulos.
- [ ] Sin animaciones CSS ni timers; sin dependencias nuevas sin aviso; el render no usa red.
- [ ] Renders sin errores ni warnings relevantes; final a 1080p y 30 fps.
- [ ] Se reportó al autor qué se hizo, qué supuestos se asumieron y qué falta.

## 4. Formato del reporte al autor

Responde en español y breve:
1. **Estado:** qué escenas/clips están listos.
2. **Resultado del check:** conteo de PASS/WARN/FAIL por formato; los WARN y FAIL pendientes con su motivo.
3. **Supuestos** asumidos y **visuales inferidos** que necesitan aprobación.
4. **Qué falta** y qué decisión necesitas del autor.
5. Propuestas de nuevas entradas para `LECCIONES.md`, si las hay.
