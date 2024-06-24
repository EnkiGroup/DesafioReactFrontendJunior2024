import { CheckboxContainer } from "./styled";
import CheckIcon from "../../assets/icons/CheckIcon";

type CheckboxProps = {
  checked: boolean;
  handleClick?: () => void;
};

const Checkbox = ({ checked = false, handleClick }: CheckboxProps) => {
  return (
    <CheckboxContainer checked={checked} onClick={handleClick} role="checked">
      {checked && <CheckIcon />}
    </CheckboxContainer>
  );
};

export default Checkbox;
