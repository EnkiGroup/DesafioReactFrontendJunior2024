import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { API_URL } from "./config";
import { todoapp, todoappH1 } from "./css/styles";


const newTodo : CSSProperties = {
  position: "relative",
  margin: 0,
  width: "100%",
  fontSize: 24,
  fontFamily: "inherit",
  fontWeight: "inherit",
  lineHeight: "1.4em",
  color: "inherit",
  boxSizing:"border-box"
}

export default function App() {
  const [tasks,setTasks] = useState<Array<any>>([])
  const fetchData = useCallback(async()=>{
    fetch(API_URL)
    .then(response => response.json()) 
    .then(data => setTasks(data)) 
    .catch(error => console.error('Erro ao buscar dados:', error));
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  return (
    <div style={{    
      margin: "0 auto",
      minWidth: 230,
      maxWidth: 550,
      }}>
      <section style={todoapp}>
        <h1 style={todoappH1}>todos</h1>
        <div>
          <input placeholder="O que precisa ser feito?" style={{
            padding: "16px 16px 16px 60px",
            height: 65,
            border: "none",
            background: "rgba(0, 0, 0, 0.003)",
            boxShadow: "inset 0 -2px 1px rgba(0, 0, 0, 0.03)",
            ...newTodo
          }} />
        </div>
        { tasks.length>0 && 
          <ul>
            {tasks.map(task=>(<li>{`${task.id} ${task.title} ${task.isDone}`}</li>))}
          </ul>
        }
      </section>
    </div>
  );
}
