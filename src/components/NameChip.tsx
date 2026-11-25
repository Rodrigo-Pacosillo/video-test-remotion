import type {FC} from "react";
import {useLayout} from "../layout";
import {theme} from "../theme";

type Props = {
  name: string;
  active?: boolean;
};

/** Chip de texto para tecnologías sin logo oficial disponible. */
export const NameChip: FC<Props> = ({name, active = false}) => {
  const {u} = useLayout();

  return (
    <div
      style={{
        padding: `${u * theme.spacingU.xs}px ${u * theme.spacingU.sm}px`,
        border: `${u * 0.15}px solid ${active ? theme.colors.accent : theme.colors.border}`,
        borderRadius: u * theme.radiiU.chip,
        backgroundColor: active ? theme.colors.surfaceAlt : theme.colors.surface,
        color: active ? theme.colors.accent : theme.colors.text,
        fontFamily: theme.fonts.sans,
        fontSize: u * theme.fontSizesU.body,
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </div>
  );
};
