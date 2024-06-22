import styled from "styled-components";

export type FormContainerProps = {
  taskEnabled?: boolean;
};

export const ContainerHomePage = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 550px;
`;

export const FormContainer = styled.section<FormContainerProps>`
  .chevronDownSolid {
    transition: all.2s;
    color: ${({ taskEnabled, theme }) =>
      taskEnabled ? theme.colors.gray_3 : theme.colors.gray_1};
    &:hover {
      color: ${({ theme }) => theme.colors.gray_3};
    }
  }
`;
