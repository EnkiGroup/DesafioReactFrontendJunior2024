import React from "react";
import { NavLink } from "react-router-dom";
import { TarefaContext } from "../../tarefaContext";
import styles from "./TarefasData.module.css";

const TarefasData = () => {
  const { tarefas, limpaCompletas } = React.useContext(TarefaContext);
  const [ativas, setAtivas] = React.useState(0);
  React.useEffect(() => {
    let contador = 0;
    tarefas.forEach((tarefa: any) => {
      if (!tarefa.isDone) {
        contador += 1;
      }
      setAtivas(contador);
    });
  }, [tarefas]);
  return (
    <div className={styles.container}>
      <p>{ativas} itens restantes</p>
      <ul className={styles.links}>
        <li>
          <NavLink to="/" end className={styles.link}>
            Todas
          </NavLink>
        </li>
        <li>
          <NavLink to="/ativas" className={styles.link}>
            Ativas
          </NavLink>
        </li>
        <li>
          <NavLink to="/completas" className={styles.link}>
            Completas
          </NavLink>
        </li>
      </ul>
      <button onClick={() => limpaCompletas()} className={styles.limpar}>
        Limpar Completas
      </button>
    </div>
  );
};

export default TarefasData;
