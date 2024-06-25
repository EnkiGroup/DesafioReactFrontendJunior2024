import React from "react";
import styles from "./Tarefa.module.css";
import { TarefaContext } from "../../tarefaContext";

const Tarefa = ({ id, title, isDone, dataKey }) => {
  const { tarefas, setTarefas, deleteTarefa } = React.useContext(TarefaContext);
  const tarefa = React.useRef();

  function handleClick(dataKey) {
    setTarefas(() =>
      tarefas.map((tarefa, index) =>
        index === dataKey ? { ...tarefa, isDone: !tarefa.isDone } : tarefa,
      ),
    );
  }

  return (
    <li className={`${styles.tarefa} ${isDone ? styles.completa : ""}`}>
      <div className={styles.container}>
        <label>
          <input
            type="checkbox"
            className={styles.check}
            defaultChecked={isDone}
            onClick={() => handleClick(dataKey)}
          />
          <span className={styles.checkmark}></span>
        </label>
        <div className={styles.tarefaContent}>
          <span id={id} ref={tarefa}>
            {title}
          </span>
          <button
            className={styles.tarefaDelete}
            onClick={() => deleteTarefa(dataKey)}
          >
            𐌢
          </button>
        </div>
      </div>
    </li>
  );
};

export default Tarefa;
