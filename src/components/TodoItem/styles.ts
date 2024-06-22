import styled, { keyframes, css } from "styled-components";

type ItemProps = {
  isEditing?: boolean;
};

const animaItem = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animaSpan = keyframes`
  from {
    width: 0;
  }
  to{
    width: 100%;
  }
`;

export const TodoItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.938rem;
  border: 1px solid rgb(227, 227, 227);
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  animation: ${animaItem} 0.2s ease-in-out;

  &:hover {
    .closeIcon {
      display: block;
    }
  }

  .closeIcon {
    display: none;
    color: rgba(0, 0, 0, 0.4);
    margin-right: 5px;
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;

export const Item = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  gap: 1.3rem;

  span {
    position: relative;
    font-size: ${({ theme }) => theme.fontSize.medium};
    color: rgb(85, 85, 85);
    white-space: nowrap;
    ${({ isEditing }) =>
      isEditing &&
      css`
        color: rgb(148, 148, 148);
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          height: 2px;
          background: rgb(148, 148, 148);
          animation: ${animaSpan} 0.2s linear forwards;
        }
      `}
  }
`;

export const InputEditing = styled.input`
  font-size: ${({ theme }) => theme.fontSize.medium};
  width: 100%;
  padding: 0 3.3rem;
  color: rgb(85, 85, 85);
  border: none;
  outline: none;
`;
