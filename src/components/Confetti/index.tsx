import { useEffect, useState } from "react";
import Firewoks from "react-canvas-confetti/dist/presets/fireworks";
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import { sleep } from "../../utils/sleep";
import ReactPortal from "../ReactPortal";

interface ConfettiProps {
  show: boolean;
}

export function Confetti({ show }: ConfettiProps) {
  const [conductor, setConductor] = useState<TConductorInstance>();

  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor);
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (mounted && conductor && show) {
        conductor.run({ speed: 3 });
        await sleep();
        conductor.pause();
      }
    };

    if (show && conductor) {
      init();
    }

    return () => {
      mounted = false;
    };
  }, [conductor, show]);

  return (
    <ReactPortal containerId="confetti">
      <Firewoks onInit={onInit} />
    </ReactPortal>
  );
}
