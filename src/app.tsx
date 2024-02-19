import React, { useEffect } from 'react'
import { useRecoilState} from 'recoil'
import { TodoListType, LocalStorageKey } from './datastructure'
import { recoilState } from './datastructure'
import NewTodoTextInput from './components/TodoInput' 
import { Layout } from './style'
import TodoList from './components/TodoList'
import UnderBar from './components/TodoUnderBar'
import axios from 'axios'
import FooterSection from './components/Footer/footer'

const TodoAPP: React.FC = () => {
  const [appState, setAppState] = useRecoilState<TodoListType>(recoilState)
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState)  
    );
  });


  useEffect(():void =>{
    const fetchData = async ()=>{
      try {
        const responseApi = await axios.get('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
        
        const uniqueApiData = responseApi.data.filter( () =>!appState.find(existingTask => existingTask.id === uniqueApiData.id));
          

        setAppState([...uniqueApiData, ...appState])
      } catch(error) {
        console.log('complete your tasks before add new tasks or same from data-base')
      }
    }
    
    fetchData();
  },[]);
  
  return (
    <Layout>
      <section className="todoapp">
          <NewTodoTextInput />
          {appState.length  ? (
          <>
            <TodoList />
            <UnderBar />

          </>
        ) : null}
      </section>
      <FooterSection/>

    </Layout>
  )
}

export default TodoAPP
