import type {FC, ReactNode} from "react";
import {useLayout} from "../layout";
import {theme} from "../theme";
import {Connector, Node, Text, type LogoItem, LogoGrid} from "../components/core";
import {Icon, type IconName} from "../components/ui/Icon";

type NodeSpec = {id: string; label: string; icon?: IconName};

const center = {x: 50, y: 50};

export const TitleTemplate: FC<{title: string; subtitle?: string; icon?: IconName}> = ({title, subtitle, icon}) => {
  const {u} = useLayout();
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: u * theme.elements.gap}}>
      {icon ? (
        <div style={{width: u * 20, height: u * 20, borderRadius: u * 3, backgroundColor: theme.colors.surface, border: `${u * 0.25}px solid ${theme.colors.border}`, display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Icon name={icon} size={u * 10} color={theme.colors.cyan} />
        </div>
      ) : null}
      <Text token="display" align="center">{title}</Text>
      {subtitle ? <Text token="label" color={theme.colors.text2} align="center">{subtitle}</Text> : null}
    </div>
  );
};

export const HeroTemplate: FC<{children: ReactNode}> = ({children}) => {
  const {u} = useLayout();
  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: u * 2, boxSizing: "border-box"}}>
      <div style={{width: "92%", height: "86%", display: "flex", alignItems: "center", justifyContent: "center"}}>{children}</div>
    </div>
  );
};

export const GridTemplate: FC<{items: readonly LogoItem[]; activeIndex?: number; showNames?: boolean}> = ({items, activeIndex, showNames}) => {
  const {orientation} = useLayout();
  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <LogoGrid items={items} activeIndex={activeIndex} showNames={showNames ?? orientation === "landscape"} />
    </div>
  );
};

export const FlowTemplate: FC<{nodes: readonly NodeSpec[]; activeId?: string}> = ({nodes, activeId}) => {
  const {orientation} = useLayout();
  const vertical = orientation === "portrait";
  const visible = nodes.slice(0, vertical ? 4 : 6);
  const positions = visible.map((_, index) => ({
    x: vertical ? 50 : ((index + 0.5) / visible.length) * 100,
    y: vertical ? ((index + 0.5) / visible.length) * 100 : 50,
  }));

  return (
    <div style={{position: "relative", width: "100%", height: "100%"}}>
      {visible.slice(0, -1).map((_, index) => (
        <Connector key={index} from={positions[index]} to={positions[index + 1]} progress={1} color={theme.colors.cyan} />
      ))}
      {visible.map((node, index) => (
        <div
          key={node.id}
          style={{
            position: "absolute",
            left: `${positions[index].x}%`,
            top: `${positions[index].y}%`,
            translate: "-50% -50%",
            zIndex: 1,
          }}
        >
          <Node label={node.label} icon={node.icon} active={activeId === node.id} dim={activeId !== undefined && activeId !== node.id} />
        </div>
      ))}
    </div>
  );
};

export const PanelTemplate: FC<{children: ReactNode}> = ({children}) => {
  const {u, orientation} = useLayout();
  return (
    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{width: orientation === "portrait" ? "100%" : "86%", maxHeight: "100%", display: "flex", flexDirection: "column", gap: u * 2}}>
        {children}
      </div>
    </div>
  );
};

export const CycleTemplate: FC<{nodes: readonly NodeSpec[]; activeIndex: number; centerIcon?: IconName}> = ({nodes, activeIndex, centerIcon = "loop"}) => {
  const {u, content} = useLayout();
  const visible = nodes.slice(0, 5);
  const size = Math.min(content.w, content.h) * 0.9;
  const rx = Math.min(30, (size / 2 / content.w) * 100);
  const ry = Math.min(30, (size / 2 / content.h) * 100);
  const positions = visible.map((_, index) => {
    const angle = (index / visible.length) * Math.PI * 2 - Math.PI / 2;
    return {x: 50 + Math.cos(angle) * rx, y: 50 + Math.sin(angle) * ry};
  });

  return (
    <div style={{position: "relative", width: "100%", height: "100%"}}>
      <div style={{position: "absolute", left: "50%", top: "50%", translate: "-50% -50%", width: size, height: size, borderRadius: "50%", border: `${u * 0.2}px dashed ${theme.colors.border}`}} />
      {visible.map((_, index) => (
        <Connector key={index} from={center} to={positions[index]} progress={1} color={index === activeIndex ? theme.colors.cyan : theme.colors.border} />
      ))}
      <div style={{position: "absolute", left: "50%", top: "50%", translate: "-50% -50%", width: u * 22, height: u * 22, borderRadius: "50%", backgroundColor: theme.colors.surface, border: `${u * 0.25}px solid ${theme.colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1}}>
        <Icon name={centerIcon} size={u * 10} color={theme.colors.cyan} />
      </div>
      {visible.map((node, index) => (
        <div key={node.id} style={{position: "absolute", left: `${positions[index].x}%`, top: `${positions[index].y}%`, translate: "-50% -50%", zIndex: 2}}>
          <Node label={node.label} icon={node.icon} active={index === activeIndex} dim={index !== activeIndex} heightU={10} iconU={5} />
        </div>
      ))}
    </div>
  );
};

export const HubTemplate: FC<{centerLabel: string; centerIcon: IconName; satellites: readonly {id: string; label: string; icon?: IconName}[]; activeId?: string}> = ({centerLabel, centerIcon, satellites, activeId}) => {
  const {orientation} = useLayout();
  const vertical = orientation === "portrait";
  const visible = satellites.slice(0, vertical ? 4 : 5);
  const positions = vertical
    ? [
        {x: 22, y: 22},
        {x: 78, y: 22},
        {x: 22, y: 78},
        {x: 78, y: 78},
      ]
    : visible.map((_, index) => {
        const angle = (index / visible.length) * Math.PI * 2 - Math.PI / 2;
        return {x: 50 + Math.cos(angle) * 34, y: 50 + Math.sin(angle) * 34};
      });

  return (
    <div style={{position: "relative", width: "100%", height: "100%"}}>
      {visible.map((_, index) => (
        <Connector key={index} from={center} to={positions[index]} progress={1} color={activeId === visible[index].id ? theme.colors.cyan : theme.colors.border} />
      ))}
      <div style={{position: "absolute", left: "50%", top: "50%", translate: "-50% -50%", zIndex: 2}}>
        <Node label={centerLabel} icon={centerIcon} active heightU={12} iconU={6} />
      </div>
      {visible.map((satellite, index) => (
        <div key={satellite.id} style={{position: "absolute", left: `${positions[index].x}%`, top: `${positions[index].y}%`, translate: "-50% -50%", zIndex: 2}}>
          <Node label={satellite.label} icon={satellite.icon} active={activeId === satellite.id} dim={activeId !== undefined && activeId !== satellite.id} heightU={10} iconU={5} />
        </div>
      ))}
    </div>
  );
};

export const ActionTemplate: FC<{active: "write" | "edit" | "run"; children: ReactNode}> = ({active, children}) => {
  const {u} = useLayout();
  const actions: {id: "write" | "edit" | "run"; label: string; icon: IconName}[] = [
    {id: "write", label: "escribir", icon: "file"},
    {id: "edit", label: "editar", icon: "pencil"},
    {id: "run", label: "ejecutar", icon: "terminal"},
  ];
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: u * 3}}>
      <div style={{display: "flex", justifyContent: "center", gap: u * 4}}>
        {actions.map((action) => (
          <Node key={action.id} label={action.label} icon={action.icon} active={active === action.id} dim={active !== action.id} heightU={9} iconU={5} />
        ))}
      </div>
      <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>{children}</div>
    </div>
  );
};

export const BoundaryTemplate: FC<{left: NodeSpec; center: NodeSpec; right: NodeSpec}> = ({left, center, right}) => {
  const {u, orientation} = useLayout();
  const widthU = orientation === "portrait" ? 72 : 130;
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: u * 1.5}}>
      <Node label={left.label} icon={left.icon} dim heightU={16} iconU={7} widthU={widthU} />
      <div style={{width: `${u * 0.2}px`, height: u * 5, backgroundColor: theme.colors.cyan, opacity: 0.5}} />
      <Node label={center.label} icon={center.icon} active heightU={16} iconU={7} widthU={widthU} />
      <div style={{display: "flex", alignItems: "center", gap: u * 1.2, height: u * 6}}>
        <div style={{width: u * 0.15, height: "100%", borderLeft: `${u * 0.2}px dashed ${theme.colors.red}`}} />
        <Icon name="lock" size={u * 3.2} color={theme.colors.red} />
      </div>
      <Node label={right.label} icon={right.icon} dim accent={theme.colors.red} heightU={16} iconU={7} widthU={widthU} />
    </div>
  );
};

export const ToolBeltTemplate: FC<{center: NodeSpec; tools: readonly NodeSpec[]}> = ({center, tools}) => {
  const {u, orientation} = useLayout();
  const vertical = orientation === "portrait";
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: u * 4}}>
      <Node label={center.label} icon={center.icon} active heightU={18} iconU={7} widthU={vertical ? 72 : 60} />
      <div
        style={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          gap: vertical ? u * 2 : u * 5,
          padding: vertical ? 0 : `${u * 2.5}px ${u * 3}px`,
          borderTop: vertical ? "none" : `${u * 0.15}px solid ${theme.colors.border}`,
          borderBottom: vertical ? "none" : `${u * 0.15}px solid ${theme.colors.border}`,
        }}
      >
        {tools.map((tool) => (
          <Node key={tool.id} label={tool.label} icon={tool.icon} dim heightU={vertical ? 12 : 16} iconU={5} widthU={vertical ? 72 : 36} />
        ))}
      </div>
    </div>
  );
};

export const TreeTemplate: FC<{root: NodeSpec; children: readonly NodeSpec[]}> = ({root, children}) => {
  const {u, orientation} = useLayout();
  const vertical = orientation === "portrait";
  const rootPoint = {x: 50, y: 14};
  const childPoints = [
    {x: 55, y: 45},
    {x: 55, y: 64},
    {x: 55, y: 83},
  ];
  const rootWidth = vertical ? 72 : 110;
  const childWidth = vertical ? 64 : 100;
  const rootBottom = vertical ? 25 : 23;
  const trunkX = vertical ? 10 : 16;
  const childLeft = vertical ? 23 : 22;

  return (
    <div style={{position: "relative", width: "100%", height: "100%"}}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 0}}
      >
        {childPoints.map((point, index) => (
          <path
            key={index}
            d={`M 50 ${rootBottom} L ${trunkX} ${rootBottom} L ${trunkX} ${point.y} L ${childLeft} ${point.y}`}
            fill="none"
            stroke={theme.colors.cyan}
            strokeWidth={u * theme.elements.connector}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div style={{position: "absolute", left: `${rootPoint.x}%`, top: `${rootPoint.y}%`, translate: "-50% -50%", zIndex: 2}}>
        <Node label={root.label} icon={root.icon} active heightU={14} iconU={6} widthU={rootWidth} />
      </div>
      {children.slice(0, 3).map((child, index) => (
        <div key={child.id} style={{position: "absolute", left: `${childPoints[index].x}%`, top: `${childPoints[index].y}%`, translate: "-50% -50%", zIndex: 2}}>
          <Node label={child.label} icon={child.icon} dim heightU={12} iconU={5} widthU={childWidth} />
        </div>
      ))}
    </div>
  );
};

export const StackTemplate: FC<{items: readonly (NodeSpec & {icon: IconName; content: string; color: string})[]; activeId?: string}> = ({items, activeId}) => {
  const {u, orientation} = useLayout();
  const vertical = orientation === "portrait";
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: vertical ? "column" : "row", alignItems: "center", justifyContent: "center", gap: u * 4}}>
      {items.slice(0, 3).map((item) => (
        <div
          key={item.id}
          style={{
            width: u * (vertical ? 72 : 30),
            minHeight: u * (vertical ? 18 : 30),
            padding: u * 2.4,
            borderRadius: u * 1.6,
            backgroundColor: theme.colors.surface,
            border: `${u * 0.2}px solid ${activeId === item.id ? item.color : theme.colors.border}`,
            boxShadow: activeId === item.id ? `0 0 ${u * 2.6}px ${item.color}33` : "none",
            opacity: activeId !== undefined && activeId !== item.id ? 0.55 : 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: u * 1.2,
            boxSizing: "border-box",
          }}
        >
          <Icon name={item.icon} size={u * 8} color={item.color} />
          <Text token="label" color={activeId === item.id ? item.color : theme.colors.text}>{item.label}</Text>
          <Text token="caption" color={theme.colors.text2} style={{whiteSpace: "normal"}}>{item.content}</Text>
        </div>
      ))}
    </div>
  );
};

export const CompareTemplate: FC<{leftLabel: string; rightLabel: string; left: ReactNode; right: ReactNode}> = ({leftLabel, rightLabel, left, right}) => {
  const {u, orientation} = useLayout();
  const vertical = orientation === "portrait";
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: vertical ? "column" : "row", gap: u * 3}}>
      <div style={{flex: 1, display: "flex", flexDirection: "column", gap: u * 1.5, minWidth: 0}}>
        <Text token="label" color={theme.colors.green}>{leftLabel}</Text>
        <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>{left}</div>
      </div>
      <div style={{flex: 1, display: "flex", flexDirection: "column", gap: u * 1.5, minWidth: 0}}>
        <Text token="label" color={theme.colors.red}>{rightLabel}</Text>
        <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>{right}</div>
      </div>
    </div>
  );
};
