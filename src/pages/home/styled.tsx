import styled, { css } from "styled-components";

export type FormContainerProps = {
  taskEnabled?: boolean;
  taskHeightLimit?: boolean;
};

export const ContainerHomePage = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 550px;
`;

export const FormContainer = styled.section<FormContainerProps>`
  border-radius: 40px;
  .chevronDownSolid {
    transition: all.2s;
    color: ${({ taskEnabled, theme }) =>
      taskEnabled ? theme.colors.gray_3 : theme.colors.gray_1};
    &:hover {
      color: ${({ theme }) => theme.colors.gray_3};
    }
  }
  box-shadow: -1px 28px 0px 17px rgba(236, 236, 236, 0.75),
    1px 30px 0px -9px #C8C8C8;
`;

export const ListItem = styled.ul<FormContainerProps>`
  ${({ taskHeightLimit }) =>
    taskHeightLimit &&
    css`
      height: 495px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.red};
      }
    `}
`;
