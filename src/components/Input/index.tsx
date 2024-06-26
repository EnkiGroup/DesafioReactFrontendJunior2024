import React from "react";
import ChevronDownSolid from "../../assets/icons/ChevronDownSolid";
import { InputForm, InputContainer } from "./styled";

type InputProps = {
  id?: string;
  placeholder: string;
  handleClickIcon?: () => void;
  enabledIcon?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const Input = ({
  id,
  placeholder,
  handleSubmit,
  handleClickIcon,
  value,
  setValue,
  enabledIcon = true,
  ...props
}: InputProps) => {
  return (
    <InputContainer onSubmit={handleSubmit} role="form">
      {enabledIcon && <ChevronDownSolid handleChange={handleClickIcon} />}
      <InputForm
        id={id}
        value={value}
        placeholder={placeholder}
        enabledIcon={enabledIcon}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      />
    </InputContainer>
  );
};

export default Input;
