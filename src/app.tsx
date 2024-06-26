import { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList.tsx';
import './app.css';
import downArrowIcon from './assets/downArrow.svg';
import ItemList from './types/ItemList';

export default function App() {


  const [list, setList] = useState<Array<ItemList>>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  let inputText = '';

  const getInputText = (e: React.ChangeEvent<HTMLInputElement>) => inputText = e.target.value;

  const markTasksAsDone = (() => {

    const newList = list.map((item: ItemList) => {

      item.isDone = true;
      return item;

    });

    setList(newList);

  });

  const send = () => {

    const item: ItemList = {
      title: inputText,
      id: Date.now() + "",
      isDone: false,
    }

    setList([
      item,
      ...list,
    ]);

    if(inputRef.current) {
      inputRef.current.value = '';
    }
  
  };

  useEffect(() => {

    const resAPI = () => {

      fetch("https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos")
      .then(res => {

        return res.json();

      })
      .then(data => {

        setList(data);

      });
      
    };

    resAPI();

  }, []);

  const verifyEmptyText = () => {

    const inputTextWithoutWhitespaces = inputText.replace(/\s/g, '');
    return inputTextWithoutWhitespaces.length >= 1

  };

  const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && verifyEmptyText()) send();
  };

  const clearCompleted = () => {

    const newList = list.filter((item) => !item.isDone);
    setList(newList);

  };

  const sla = list.find(item => item.isDone);

  // if(!item.isDone) totalUnchecked++;

  return (
    <div className='todo'>
      <h1 className='title'>todos</h1>

      <div className='container'>
        <button className='container__btn' onClick={markTasksAsDone}><img alt='Mark all tasks as done' src={downArrowIcon} className='container__btn__svg'/></button>
        <input className='container__input' ref={inputRef} onKeyDown={enterPress} onInput={getInputText} type="text" placeholder="What needs to be done?"></input>
      </div>
      

    <ul className='list'>
      <Routes>
        <Route path='/' element={<TaskList setList={setList} list={list} filterRule='all'/>}></Route>
        <Route path='/active' element={<TaskList setList={setList} list={list} filterRule='active'/>}></Route>
        <Route path='/completed' element={<TaskList setList={setList} list={list} filterRule='completed'/>}></Route>
      </Routes>
    </ul>

      { list.length ? (
        <footer className='footer'>

          {list.filter(item => !item.isDone).length + " itens left!"}

          <nav>
            <NavLink className={({isActive}) => isActive ? 'footer__filter footer__filter--active' : 'footer__filter'} to='/'>All</NavLink>
            <NavLink className={({isActive}) => isActive ? 'footer__filter footer__filter--active' : 'footer__filter'} to='/active'> Active </NavLink>
            <NavLink className={({isActive}) => isActive ? 'footer__filter footer__filter--active' : 'footer__filter'} to='/completed'>Completed</NavLink>
          </nav>

          <button className='footer__clear-btn' disabled={(sla ? false : true)} onClick={clearCompleted}>Clear completed</button>

        </footer>
      ) : null }
    </div>
  );
};