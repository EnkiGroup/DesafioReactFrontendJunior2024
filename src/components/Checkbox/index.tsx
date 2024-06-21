import { CheckboxContainer } from "./styled";
import CheckIcon from "../../assets/icons/CheckIcon";

type CheckboxProps = {
  checked: boolean;
};

const Checkbox = ({ checked = false }: CheckboxProps) => {
  return (
    <CheckboxContainer checked={checked}>
      {checked && <CheckIcon />}
    </CheckboxContainer>
  );
};

export default Checkbox;
