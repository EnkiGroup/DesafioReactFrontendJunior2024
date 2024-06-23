import styled from "styled-components";

const FooterConteiner = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 5px;
  margin-top: 2.5rem;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray_3};

  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.red};
    margin-top: 5px;
  }
`;

export default FooterConteiner;
