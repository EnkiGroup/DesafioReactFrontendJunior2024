import React from "react";

export const TarefaContext = React.createContext();

export const TarefaStorage = ({ children }) => {
  const [tarefas, setTarefas] = React.useState([]);

  React.useEffect(() => {
    async function requestTarefas() {
      try {
        const response = await (
          await fetch(
            "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos",
          )
        ).json();
        if (response) setTarefas(() => [...response]);
      } catch (err) {
        console.log(err);
      }
    }
    requestTarefas();
  }, []);

  function deleteTarefa(dataKey) {
    setTarefas(tarefas.filter((tarefa, index) => index !== dataKey));
  }

  const [ativo, setAtivo] = React.useState(false);
  function ativaAll() {
    setTarefas(() =>
      tarefas.map((tarefa) =>
        !tarefa.isDone ? { ...tarefa, isDone: true } : tarefa,
      ),
    );
    setAtivo(true);
  }
  function desativaAll() {
    setTarefas(() =>
      tarefas.map((tarefa) =>
        tarefa.isDone ? { ...tarefa, isDone: false } : tarefa,
      ),
    );
    setAtivo(false);
  }

  function limpaCompletas() {
    setTarefas(tarefas.filter((tarefa) => !tarefa.isDone === true));
  }

  return (
    <TarefaContext.Provider
      value={{
        tarefas,
        setTarefas,
        deleteTarefa,
        ativaAll,
        desativaAll,
        ativo,
        limpaCompletas,
      }}
    >
      {children}
    </TarefaContext.Provider>
  );
};
