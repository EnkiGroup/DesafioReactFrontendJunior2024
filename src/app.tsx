/** @jsxImportSource @emotion/react */
import { useCallback, useContext, useEffect } from "react";

import { API_URL } from "./config";
import {todoapp} from "./css/styles";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import { TaskContext } from "./TaskContext";

export default function App() {
  const {tasks,setTasks} = useContext(TaskContext);

  const fetchData = useCallback(async()=>{
    fetch(API_URL)
    .then(response => response.json()) 
    .then(data => setTasks(data)) 
    .catch(error => console.error('Erro ao buscar dados:', error));
  },[setTasks])

  useEffect(()=>{
    fetchData()
  },[fetchData])


  return (

    <div style={{    
      margin: "0 auto",
      minWidth: 230,
      maxWidth: 550,
      fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif'
      }}>
      <section css={todoapp}>
        <Header />
        {
          tasks.length>0 &&
          <>
            <Tasks/>
            <Footer/>
          </>
        }
      </section>
    </div>
  );
}
