import styled from "styled-components";

export const TodoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.938rem;
  border: 1px solid rgb(227, 227, 227);
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  .closeIcon {
    color: rgba(0, 0, 0, 0.4);
    margin-right: 5px;
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3rem;

  span {
    font-size: ${({ theme }) => theme.fontSize.medium};
    color: rgb(85, 85, 85);
  }
`;
