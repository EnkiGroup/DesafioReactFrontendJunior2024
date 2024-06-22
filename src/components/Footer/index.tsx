/** @jsxImportSource @emotion/react */
import { useContext, useMemo } from "react";
import { Task } from "../../types";
import {clearCompletedFooter, countTasksFooter, filtersFooter,listFootter} from "./styles";
import { TaskContext } from "../../TaskContext";

export default function Footer (){
    const {tasks} = useContext(TaskContext);
    const activeTodos = useMemo(() => tasks.filter((task:Task) => !task.isDone), [tasks]);
    return (
        <footer css={listFootter}>
        <span css={countTasksFooter}>{`${activeTodos.length} ${activeTodos.length>1?"itens ativos!":"item ativo!"}`} </span>
        <ul css={filtersFooter}>
          <li>Todos</li>
          <li>Ativos</li>
          <li>Realizados</li>
        </ul>
        <button css={clearCompletedFooter}>Remover realizados</button>
      </footer>
    )
}