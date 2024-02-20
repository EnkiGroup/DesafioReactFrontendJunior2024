import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  font-size: 0.9rem;
  gap: 0.5rem;
`;

export const FiltersButton = styled(NavLink)`
  padding: 0.3rem 0.5rem;
  border: 0;
  cursor: pointer;
  border-radius: 2px;
  transition: border ease-in 0.2s;
  text-decoration: none;
  color: ${(props) => props.theme["gray-600"]};

  border: 1px solid ${(props) => props.theme["white"]};

  &.active {
    border: 1px solid ${(props) => props.theme["red"]};
  }
  &:hover {
    border: 1px solid ${(props) => props.theme["red"]};
  }
`;
