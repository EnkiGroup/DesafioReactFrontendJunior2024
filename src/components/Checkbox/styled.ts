import styled, { keyframes } from "styled-components";

export type CheckboxContainerProps = {
  checked: boolean;
};

const animaIcon = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
  border: 1px solid
    ${({ checked, theme }) =>
      checked ? theme.colors.TaskCompleted : theme.colors.gray_2};
  text-align: center;
  transition: 0.2s;
  cursor: pointer;

  svg {
    animation: ${animaIcon} 0.2s forwards;
  }
`;
