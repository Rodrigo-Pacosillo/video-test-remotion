import type {FC} from "react";
import {useCurrentFrame} from "remotion";
import {Background, Connector, Logo, Node, Stage} from "../../components/core";
import {useLayout} from "../../layout";
import {theme} from "../../theme";

type Point = {x: number; y: number};

const services = [
  {file: "github.svg", name: "GitHub", threshold: 38},
  {file: "postgresql.svg", name: "PostgreSQL", threshold: 72},
  {file: "googlecloud.svg", name: "Google Cloud", threshold: 106},
];

export const McpScene: FC = () => {
  const frame = useCurrentFrame();
  const {orientation} = useLayout();
  const vertical = orientation === "portrait";
  const center: Point = {x: 50, y: 50};
  const positions: Point[] = vertical
    ? [
        {x: 22, y: 20},
        {x: 78, y: 20},
        {x: 50, y: 84},
      ]
    : [
        {x: 14, y: 50},
        {x: 86, y: 20},
        {x: 86, y: 80},
      ];

  return (
    <Background accent={theme.colors.violet}>
      <Stage>
        <div style={{position: "relative", width: "100%", height: "100%"}}>
          {positions.map((point, index) => {
            const edge = {x: point.x + (center.x - point.x) * 0.12, y: point.y + (center.y - point.y) * 0.12};
            return <Connector key={services[index].file} from={center} to={edge} progress={1} color={frame >= services[index].threshold ? theme.colors.cyan : theme.colors.border} />;
          })}

          <div style={{position: "absolute", left: "50%", top: "50%", translate: "-50% -50%", zIndex: 2}}>
            <Node label="MCP" icon="plug" active heightU={12} iconU={6} />
          </div>

          {positions.map((point, index) => {
            const active = frame >= services[index].threshold;
            return (
              <div key={services[index].file} style={{position: "absolute", left: `${point.x}%`, top: `${point.y}%`, translate: "-50% -50%", zIndex: 2}}>
                <Logo file={services[index].file} name={services[index].name} sizeU={16} showName active={active} dim={!active} />
              </div>
            );
          })}
        </div>
      </Stage>
    </Background>
  );
};
