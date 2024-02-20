import styled from "styled-components";

interface InputCustomProps {
  $mark?: boolean;
}

export const Container = styled.div<InputCustomProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  div {
    position: absolute;
    top: 6px;
    left: 4px;
    cursor: pointer;
  }

  &:hover button {
    display: block;
  }

  input {
    width: 100%;
    font-size: 1.5rem;
    padding: 0.938rem 5rem 0.938rem 3.75rem;
    outline: none;
    border: none;
    background: #fff;
    flex: 1;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme["border"]};
    text-decoration: ${(props) => (props.$mark ? "line-through" : "none")};
    color: ${(props) =>
      props.$mark ? props.theme["completed"] : props.theme["gray-500"]};

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const EditInput = styled.input<InputCustomProps>`
  width: 100%;
  font-size: 1.5rem;
  padding: 0.938rem 5rem 0.938rem 3.75rem;
  outline: none;
  border: none;
  background: #fff;
  flex: 1;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme["border"]};
  text-decoration: ${(props) => (props.$mark ? "line-through" : "none")};
  color: ${(props) =>
    props.$mark ? props.theme["completed"] : props.theme["gray-500"]};

  &:focus {
    border: 2px solid ${({ theme }) => theme["red"]};
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

export const DeletedTaskButton = styled.button`
  width: 50px;
  position: absolute;
  right: 10px;
  cursor: pointer;
  display: none;

  svg {
    color: rgba(0, 0, 0, 0.4);

    &:hover {
      transition: colors 0.2s ease;
      display: hidden;
      color: ${({ theme }) => theme.red};
    }
  }
`;
