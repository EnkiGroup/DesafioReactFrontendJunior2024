import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ButtonContainer = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: #111;
  padding: 0.3rem 0.5rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.white};
  text-decoration: none;
  border-radius: 2px;
  transition: all ease-in 0.2s;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.red};
    cursor: pointer;
  }

  &.active {
    border: 1px solid ${({ theme }) => theme.colors.red};
  }
`;

export default ButtonContainer;
