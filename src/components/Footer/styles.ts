import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffff;
  border-top: 1px solid ${(props) => props.theme["border"]};
  padding: 0.8rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);

  button {
    font-size: 0.9rem;
    color: ${({ theme }) => theme["gray-700"]};

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const SummaryTasks = styled.div`
  span {
    font-size: 0.9rem;
  }
`;
