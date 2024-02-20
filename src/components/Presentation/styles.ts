import styled from "styled-components";

export const PresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  color: ${({ theme }) => theme["gray-500"]};
  padding: 2rem;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.red};
    font-weight: 500;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    width: 100%;
    height: 32px;
    cursor: pointer;
    background-color: ${({ theme }) => theme["gray-900"]};
  }
`;
