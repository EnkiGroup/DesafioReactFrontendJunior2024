import styled from "styled-components";

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(246, 245, 252, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;

  img {
    max-width: 300px;
    width: 100%;
  }
`;
