import styled from "styled-components";

export const ToastContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const MessageContainer = styled(ToastContainer)`
  gap: 10px;
`;

export const ButtonContainer = styled(ToastContainer)`
  flex-direction: column;
  align-items: end;
  gap: 5px;

  button {
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.gray_4};
    padding: 2px 8px;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    transform: translateY(0);
    transition: all.2s;

    &:first-child {
      background: ${({ theme }) => theme.colors.blueIcon};
      font-weight: 600;
      color: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      transform: translateY(4px);
    }
  }
`;
