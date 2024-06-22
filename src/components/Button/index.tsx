import { NavLinkProps } from "react-router-dom";
import ButtonContainer from "./styled";
import { FC, ReactNode } from "react";

interface ButtonProps extends NavLinkProps {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonContainer {...props}>{children}</ButtonContainer>;
};

export default Button;
