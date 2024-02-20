import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  position: relative;

  h1 {
    font-size: 80px;
    position: absolute;
    color: ${(props) => props.theme["red"]};
    font-weight: 200;
    top: -50px;
    bottom: 0;
    right: 50%;

    transform: translate(50%, -50%);
  }
`;
