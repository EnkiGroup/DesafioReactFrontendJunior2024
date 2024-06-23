import { ListFilters, ListFooter } from './style'

const FooterList = () => {
  return (
    <ListFooter>
      <span>2 item left!</span>
      <ListFilters>
        <li>
          <a href="#">All</a>
        </li>
        <li>
          <a href="#">Active</a>
        </li>
        <li>
          <a href="#">Completed</a>
        </li>
      </ListFilters>
      <a href="#">Clear completed</a>
    </ListFooter>
  )
}

export default FooterList
