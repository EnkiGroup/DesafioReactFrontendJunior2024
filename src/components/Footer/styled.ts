import styled from "styled-components";

const FooterConteiner = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  margin-top: 3.5rem;
  font-size: 14px;
  color: #a3a3a3;

  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.red};
    margin-top: 5px;

    &:first-child {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.black};
    }

    &:hover{
      text-decoration: underline;
    }
  }
`;

export default FooterConteiner;
