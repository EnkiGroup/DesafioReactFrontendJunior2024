import { useDispatch, useSelector } from 'react-redux'

import { RootReducer } from '../../../store'

import { capturarRota, clearTodo } from '../../../store/reducer/reducerStates'

import { ListFilters, ListFooter, LinkFilter } from './style'

const FooterList = () => {
  const { listTodo, rotaAtual } = useSelector((s: RootReducer) => s.reducers)

  const dispatch = useDispatch()

  const estaCompleto = listTodo.find((item) => item.isDone === true)

  const filterActive = listTodo.filter((item) => item.isDone !== true)

  return (
    <>
      {listTodo.length > 0 && (
        <ListFooter>
          <span>{filterActive.length} item left!</span>
          <ListFilters>
            <li>
              <LinkFilter
                className={rotaAtual === 'all' ? 'link_filter_selected' : ''}
                onClick={() => dispatch(capturarRota('all'))}
                to="/"
              >
                All
              </LinkFilter>
            </li>
            <li>
              <LinkFilter
                className={rotaAtual === 'active' ? 'link_filter_selected' : ''}
                onClick={() => dispatch(capturarRota('active'))}
                to="/Active"
              >
                Active
              </LinkFilter>
            </li>
            <li>
              <LinkFilter
                className={
                  rotaAtual === 'completed' ? 'link_filter_selected' : ''
                }
                onClick={() => dispatch(capturarRota('completed'))}
                to="/Completed"
              >
                Completed
              </LinkFilter>
            </li>
          </ListFilters>
          <button>
            <a
              className={estaCompleto ? 'active' : 'link_clear'}
              onClick={() => dispatch(clearTodo())}
              href="#"
            >
              Clear completed
            </a>
          </button>
        </ListFooter>
      )}
    </>
  )
}

export default FooterList
