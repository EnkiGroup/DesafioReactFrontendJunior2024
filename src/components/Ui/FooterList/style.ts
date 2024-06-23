import styled from 'styled-components'

export const ListFooter = styled.div`
  height: 50px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  text-align: center;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const ListFilters = styled.ul`
  display: flex;
  align-items: center;

  li {
    list-style: none;

    a {
      margin: 3px;
      padding: 3px 7px;
      color: black;
      border: 1px solid transparent;
      border-radius: 3px;

      &:hover {
        border-color: #ce4646;
        text-decoration: none;
      }
    }
  }
`
