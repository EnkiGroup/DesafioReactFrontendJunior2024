import '../../app.css'
import xMarkIcon from '../../assets/xMark.svg'
import ItemList from '../../types/ItemList';

interface TaskListProps {
  list: Array<ItemList>,
  setList: React.Dispatch<React.SetStateAction<Array<ItemList>>>,
  filterRule: string,
}

export default function TaskList({ list, setList, filterRule }: TaskListProps): JSX.Element {


  const remove = (id: string) => {

    const newList = list.filter((item: ItemList) => {
      return item.id !== id;
    });

    setList(newList);

  };

  const makeItemEditable = (id: string) => {

    const newList = list.map((item: ItemList) => {

      if(item.id === id) item.editMode = true;

      return item
    });

    setList(newList);

  };

  const updateTask = (id: string, e: React.KeyboardEvent<HTMLInputElement> ) => {

    if(e.key === "Enter") {

      const newList = list.map((item: ItemList) => {

        if(item.id === id) {

          item.editMode = false;
          item.title = (e.target as HTMLInputElement).value;

        };

        return item;

      });

      setList(newList);

    };
  };

  const toggleDone = (id: string) => {

    const newList = list.map((item: ItemList) => {

      if(item.id === id) item.isDone = !item.isDone;

      return item;

    });

    setList(newList);

  };

  const $tasks = list
  .filter((item: ItemList) => {

    if(filterRule === 'all') return true;

    if(filterRule === 'active') return !item.isDone;

    if(filterRule === 'completed') return item.isDone;

    return item;

  })
  .map((item: ItemList) => {

    return (

      <li className='list__item' key={item.id}>

        {item.editMode ? (
            <input autoFocus className='container__input' defaultValue={item.title} onKeyDown={(e) => updateTask(item.id, e)}></input>
          ) : (
            <>
              <input className='list__item__checkbox' id={item.id} onChange={() => toggleDone(item.id)} checked={item.isDone} type="checkbox"></input>

              <label className='list__item__label' htmlFor={item.id} onDoubleClick={() => makeItemEditable(item.id)}> {item.title} </label>

              <button className='list__item__delete-btn' onClick={() => remove(item.id)}>
                <img alt="Delete item" className='list__item__delete-btn__icon' src={xMarkIcon}/>
              </button>
            </>
          )}
      </li>

    );

  });

  return <>{$tasks}</>;

};