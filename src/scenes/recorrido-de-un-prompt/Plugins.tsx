import type {FC} from "react";
import {useCurrentFrame} from "remotion";
import {Background, PackageBox, Stage} from "../../components/core";
import {HeroTemplate} from "../../templates";

export const PluginsScene: FC = () => {
  const frame = useCurrentFrame();
  const install = Math.min(1, Math.max(0, (frame - 150) / 40));
  const pulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <Background accent="#38BDF8">
      <Stage focus={{x: 0.08, y: 0.08, w: 0.84, h: 0.84}}>
        <HeroTemplate>
          <PackageBox
            items={[
              {label: "skill", icon: "lock"},
              {label: "MCP", icon: "plug"},
              {label: "hooks", icon: "bolt"},
            ]}
            install={install}
            pulse={pulse}
          />
        </HeroTemplate>
      </Stage>
    </Background>
  );
};
