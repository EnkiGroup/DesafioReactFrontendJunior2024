import styled from "styled-components";

const TitleContainer = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.red};
  text-align: center;
`;

export default TitleContainer;
