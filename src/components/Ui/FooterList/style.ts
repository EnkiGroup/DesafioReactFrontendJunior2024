import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ListFooter = styled.div`
  height: 50px;
  padding: 10px 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  font-size: 15px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);

  .link_clear {
    display: none;
  }

  .active {
    width: 68%;
    display: block;
    color: black;
    text-decoration: none;
    text-align: end;
    font-size: 15px;
    line-height: 19px;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      box-shadow: 0 0 2px 2px #cf7d7d;
    }
  }

  button {
    display: flex;
    justify-content: end;
    background-color: transparent;
    border: none;
  }

  .link_filter_selected {
    border: 1px solid #ce4646;

    &:active {
      box-shadow: 0 0 2px 2px #cf7d7d;
    }
  }
`

export const ListFilters = styled.ul`
  display: flex;
  align-items: center;

  li {
    list-style: none;
  }
`

export const LinkFilter = styled(Link)`
  margin: 3px;
  padding: 3px 7px;
  color: black;
  border: 1px solid transparent;
  border-radius: 3px;
  text-decoration: none;
  opacity: 1;

  &:hover {
    border-color: #ce4646;
  }

  &:active {
    box-shadow: 0 0 2px 2px #cf7d7d;
  }
`
