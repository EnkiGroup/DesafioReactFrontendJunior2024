import React from "react";
import styles from "./Input.module.css";
import { TarefaContext } from "../../tarefaContext";

const Input = ({ placeholder, ...props }: { placeholder: string }) => {
  const { ativaAll, desativaAll, ativo } = React.useContext(TarefaContext);

  return (
    <div className={styles.inputContainer}>
      <span
        className={styles.toggleAll}
        onClick={ativo ? desativaAll : ativaAll}
      ></span>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
