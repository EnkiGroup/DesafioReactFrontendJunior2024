import ReactPortal from "../ReactPortal";
import Spinner from "../Spinner";
import { Overlay } from "./styles";

import logo from "../../assets/logo.svg";

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay data-testid="overlay">
        <img src={logo} alt="todomvc logo" loading="eager" />
        <Spinner size={32} data-testid="spinner" />
      </Overlay>
    </ReactPortal>
  );
}
