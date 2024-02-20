import { StyledSpinner } from "./styles";

interface SpinnerProps {
  size: number;
}

export default function Spinner({ size }: SpinnerProps) {
  return <StyledSpinner size={size} />;
}
