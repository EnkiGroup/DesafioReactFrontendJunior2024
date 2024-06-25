import React from "react";
import Tarefa from "./Tarefa";
import Input from "./Input";
import styles from "./TarefaInput.module.css";
import { TarefaContext } from "../../tarefaContext";
import TarefasData from "./TarefasData";

const TarefasAtivas = () => {
  const [value, setValue] = React.useState("");
  const { tarefas, setTarefas } = React.useContext(TarefaContext);
  function onChange({ target }) {
    setValue(target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setTarefas([...tarefas, { id: "teste", title: value, isDone: false }]);
    setValue("");
  }
  return (
    <>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            value={value}
            onChange={onChange}
            placeholder="O que precisa ser feito ?"
          />
        </form>
        {tarefas &&
          tarefas.map((tarefa, index) =>
            tarefa.isDone === false ? (
              <Tarefa {...tarefa} key={index} dataKey={index} />
            ) : null,
          )}
        <TarefasData />
      </div>
    </>
  );
};

export default TarefasAtivas;
