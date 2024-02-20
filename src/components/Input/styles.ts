import styled from "styled-components";

export const InputContainer = styled.form`
  width: 100%;
  height: 65px;
  position: relative;
  display: flex;
  z-index: 10;

  input {
    width: 100%;
    padding: 0.938rem 0.938rem 0.938rem 3.125rem;
    font-size: 1.5rem;
    outline: none;
    border: 0;
    font-style: italic;
    cursor: pointer;

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    &:focus {
      box-shadow: 0 0 2px 2px #cf7d7d;
    }
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 18px;
  left: 10px;
  cursor: pointer;

  svg {
    font-weight: bold;
    color: ${(props) => props.theme["gray-500"]};

    transition: colors 0.2s ease;

    &:hover {
      color: ${(props) => props.theme["gray-700"]};
    }
  }
`;
