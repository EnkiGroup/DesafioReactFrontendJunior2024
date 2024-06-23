import styled from "styled-components";

export type InputContainerProps = {
  enabledIcon?: boolean;
};

export const InputForm = styled.input<InputContainerProps>`
  width: 100%;
  height: 65px;
  background: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.medium};
  padding: ${({ enabledIcon }) =>
    enabledIcon ? "0.938rem 0.938rem 0.938rem 3.855rem" : "0.938rem"};
  border: none;
  outline: none;
  font-style: italic;
  transition: 0.3s;
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    box-shadow: 0 0 2px 2px #cf7d7d;
  }
`;

export const InputContainer = styled.form`
  position: relative;
  svg {
    position: absolute;
    top: 18px;
    left: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray_1};
  }
`;
