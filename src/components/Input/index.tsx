import ChevronDownSolid from "../../assets/icons/ChevronDownSolid";
import { InputForm, InputContainer } from "./styled";

type InputProps = {
  id: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleClickIcon?: () => void;
  enabledIcon?: boolean;
};

const Input = ({
  id,
  setValue,
  placeholder,
  handleClickIcon,
  enabledIcon = true,
  ...props
}: InputProps) => {
  return (
    <InputContainer>
      {enabledIcon && <ChevronDownSolid handleChange={handleClickIcon} />}
      <InputForm
        id={id}
        placeholder={placeholder}
        onChange={({ target }) => setValue(target.value)}
        enabledIcon={enabledIcon}
        {...props}
      />
    </InputContainer>
  );
};

export default Input;
