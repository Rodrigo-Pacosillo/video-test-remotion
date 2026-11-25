import type {FC} from "react";
import {AbsoluteFill, Sequence} from "remotion";
import {CodeBlock, Diagram, LogoGrid, Terminal, TitleCard} from "../components";
import {useLayout} from "../layout";
import {theme} from "../theme";

/**
 * Composición TÉCNICA de verificación: NO es un video ni una escena aprobada.
 * Se sustituye por la línea de tiempo real cuando llegue el primer guion.
 */
export const TemplateVideo: FC = () => {
  const {fps, orientation, u, safeInset} = useLayout();
  const column = orientation === "portrait";

  return (
    <AbsoluteFill style={{backgroundColor: theme.colors.background, fontFamily: theme.fonts.sans}}>
      <Sequence durationInFrames={1 * fps}>
        <TitleCard title="Ecosistema listo" subtitle="Base reutilizable de videos explicativos" />
      </Sequence>

      <Sequence from={1 * fps} durationInFrames={1 * fps}>
        <Diagram
          title="Flujo base"
          nodes={[
            {id: "usuario", label: "Usuario"},
            {id: "modelo", label: "Modelo"},
            {id: "herramienta", label: "Herramienta"},
            {id: "resultado", label: "Resultado"},
          ]}
          activeId="herramienta"
        />
      </Sequence>

      <Sequence from={2 * fps} durationInFrames={1 * fps}>
        <div
          style={{
            display: "flex",
            flexDirection: column ? "column" : "row",
            gap: u * theme.spacingU.md,
            width: "100%",
            height: "100%",
            paddingTop: safeInset.top,
            paddingRight: safeInset.right,
            paddingBottom: safeInset.bottom,
            paddingLeft: safeInset.left,
            boxSizing: "border-box",
          }}
        >
          <div style={{flex: 1}}>
            <CodeBlock
              title="ejemplo.ts"
              lines={[
                "const modelo = crearModelo();",
                'const salida = modelo.usar("herramienta");',
                "return salida;",
              ]}
              highlightedLines={[2]}
            />
          </div>
          <div style={{flex: 1, display: "flex", flexDirection: "column", gap: u * theme.spacingU.md}}>
            <Terminal command="npm run dev" output={["Remotion Studio listo"]} />
            <LogoGrid
              title="Ejemplos"
              items={[{name: "A"}, {name: "B"}, {name: "C"}, {name: "D"}]}
            />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
