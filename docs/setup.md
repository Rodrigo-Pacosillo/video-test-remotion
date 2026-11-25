# Instalación y preparación (una sola vez)

Lee este documento **solo si falta algo del entorno o el proyecto aún no existe**. Si todo funciona, no lo uses.

Antes de instalar, **verifica qué ya existe** (`node -v`, `npm -v`, `ffmpeg -version`, `python --version`). No reinstales lo que ya está.

## 1. Requisitos del sistema
- **Node.js** LTS reciente y npm. Si falta, pide al autor que lo instale.
- **FFmpeg** disponible en el PATH.
- **Python 3.10+** (solo para transcripción).

## 2. Crear el proyecto Remotion
Si el proyecto aún no existe:

```bash
npx create-video --yes --blank explainer-videos
cd explainer-videos
npm install
```

Si ya existe un proyecto Remotion en el directorio, **no crees otro**.

## 3. Instalar las Agent Skills oficiales de Remotion
Desde la raíz del proyecto:

```bash
npx remotion skills add
```

Alternativa equivalente (usa **una sola** ruta, no ambas):

```bash
npx skills add remotion-dev/skills
```

Si usas Claude Code existe además un plugin oficial (`claude plugin marketplace add remotion-dev/claude-code-plugin` y `claude plugin install remotion@remotion`). No lo instales si ya instalaste las skills por otra vía. Reinicia el agente tras instalar.

Después, **usa las skills** (en especial `remotion-best-practices`). Para la API exacta consulta `remotion-docs` en vez de recordar de memoria: cambia entre versiones. Para subtítulos, `remotion-captions`.

## 4. Librerías de logos
```bash
npm install @lobehub/icons-static-svg simple-icons
```
Son solo **fuente**: copia a `public/assets/logos/` únicamente los SVG que uses y referéncialos con `staticFile()`. Fija las versiones en `package.json`. Los logos siguen siendo marcas de sus dueños (reglas en `docs/ejemplos-visuales.md`).

## 5. Dependencias adicionales pre-aprobadas
```bash
npm install --save-dev sharp
npm install @remotion/layout-utils @remotion/transitions
```
Usa la misma versión de Remotion que el proyecto (consulta `remotion-docs` si hay dudas). Cualquier otra dependencia (por ejemplo `shiki` o `prism-react-renderer` para resaltar código): avisa y justifica antes.

## 6. Fuentes
Guarda las fuentes en `public/assets/fonts/` (por ejemplo Inter y JetBrains Mono, de licencia abierta) y cárgalas localmente. El render no depende de internet.

## 7. Entorno Python para transcripción
```bash
python -m venv .venv
# Linux/macOS: source .venv/bin/activate
# Windows:     .venv\Scripts\activate
pip install faster-whisper
```

## 8. Verificar que todo funciona
```bash
npm run dev          # abre Remotion Studio; debe cargar sin errores
npx remotion --help
```
Informa al autor del resultado antes de continuar. Después, sigue con la **Fase 0 (Calibración)** de `docs/pipeline.md`.

## 9. Scripts a crear en `package.json`
`render:long`, `render:clips`, `render:all`, `render:draft`, `check` (descritos en `docs/pipeline.md` y `docs/verificacion.md`).
