import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
  font-size: ${({ theme }) => theme.fontSize.small};

  span:last-child{
    &:hover{
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 375px){
    flex-direction: column;
    gap: 10px;
  }
`;

export const FilterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
