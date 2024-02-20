import { InputHTMLAttributes } from "react";
import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from "./styles";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

export function Checkbox({ checked, ...props }: CheckboxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked} data-testid="checkbox-icon">
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}
