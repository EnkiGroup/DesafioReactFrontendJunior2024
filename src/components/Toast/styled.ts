import styled from "styled-components";

export const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
`;

export const ButtonContainer = styled(ToastContainer)`
  flex-direction: row;
  gap: 5px;

  button {
    color: #111827;
    background: #f3f4f6;
    padding: 4px 8px;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
  }
`;
