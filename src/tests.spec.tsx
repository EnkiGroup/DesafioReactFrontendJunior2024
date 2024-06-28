import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import App from "./app";
import { TaskContext } from "./TaskContext";
import { HashRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render , screen } from '@testing-library/react';
import { Task } from './types';

interface MockTaskProviderProps {
    children: React.ReactNode;
    initialTasks: Task[];
  }
const tasksMock = [
    { "id": "flrGI", "title": "Lavar os pratos", "isDone": false },
    { "id": "Tw-I9", "title": "Cortar a grama", "isDone": true },
    { "id": "7f2sf", "title": "Comprar pão", "isDone": false }
]
const MockTaskProvider = ({ children, initialTasks }:MockTaskProviderProps) => {
    const [tasks, setTasks] = React.useState(initialTasks);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
        {children}
        </TaskContext.Provider>
    );
};
const renderWithContext = (initialTasks:any) => {
return render(
    <React.StrictMode>
    <HashRouter>
        <Routes>
        <Route path="*" element={
            <MockTaskProvider initialTasks={initialTasks}>
            <App />
            </MockTaskProvider>
        } />
        </Routes>
    </HashRouter>
    </React.StrictMode>
);
};

describe("<App />",()=>{
    it("Rederização do input",()=>{
        renderWithContext([])

        expect(screen.queryByTestId("input-task")).toBeInTheDocument();
    })
    it("Rederização da lista de tarefas",()=>{
        
        renderWithContext(tasksMock)

        expect(screen.getByTestId("tasklist")).toBeInTheDocument();
    }),
    it("Rederização da lista de tarefas com a lista vazia",()=>{
        renderWithContext([])

        expect(screen.queryByTestId("tasklist")).toBeNull();
    })
    it("Rederização do footer",()=>{
        renderWithContext(tasksMock)

        expect(screen.getByTestId("footerlist")).toBeInTheDocument();
    }),
    it("Rederização do footer com a lista vazia",()=>{
        renderWithContext([])

        expect(screen.queryByTestId("footerlist")).toBeNull();
    }),

    it("Requisito 3-Criação de tarefa",()=>{
        renderWithContext(tasksMock)

        const inputTask = screen.getByTestId("input-task");
        fireEvent.change(inputTask, { target: { value: "Nova tarefa" } });
        fireEvent.keyDown(inputTask, { key: "Enter", code: "Enter" });

        const taskList = screen.getByTestId("tasklist");
        const firstTask = taskList.firstChild as HTMLElement;
        const toggleElement = firstTask.querySelector('.toggle') as HTMLInputElement | null;
        // Testa não apenas a criação da tarefa como também se é a primeira tarefa
        expect(firstTask.textContent).toBe("Nova tarefa");
        // Testa se a tarefa foi criada como não concluída
        expect(toggleElement && !toggleElement.checked).toBe(true)
    })

    it("Requisito 4-Listar as tarefas",()=>{
        /* 
            quando uma tarefa é renderizada é criado um li com id no seguinte formato
            item-[id]
            confirmar que há no documento um elemento assim para cada elemento do 
            meu meu mock(tasksMock) confirma que todas as tarefas estão sendo 
            exibidas.
        */
        renderWithContext(tasksMock)

        expect(screen.getByTestId("item-flrGI")).toBeInTheDocument();
        expect(screen.getByTestId("item-Tw-I9")).toBeInTheDocument();
        expect(screen.getByTestId("item-7f2sf")).toBeInTheDocument();
    })

    it("Requisito 5-Marcar ou desmarcar uma tarefa como concluída",()=>{
        renderWithContext(tasksMock)
        // inicia com isDone false
        const taskToDo= screen.getByTestId("item-flrGI")
        // inicia com isDone true 
        const taskDone= screen.getByTestId("item-Tw-I9")
        const taskToDoToggleElement = taskToDo.querySelector('.toggle') as HTMLInputElement ;
        const taskDoneToggleElement = taskDone.querySelector('.toggle') as HTMLInputElement ;

        //simula clique do usuário no botão de ambos para alterar o status da tarefa
        fireEvent.click(taskToDoToggleElement);
        fireEvent.click(taskDoneToggleElement);

        //verifica se o staus de ambas as tarefas foi invertido após o clique 
        expect(taskToDoToggleElement.checked).toBe(true);
        expect(taskDoneToggleElement.checked).toBe(false);
    })

    it("Requisito 6-Ao passar o mouse sobre uma tarefa, um ícone de remoção é exibido; ao clicar, a tarefa é removida", async () => {
        renderWithContext(tasksMock);
    
        const task = screen.getByTestId("item-flrGI");
        const removeButton = task.querySelector("button") as HTMLButtonElement;

        // Simula o clique no botão de remoção
        fireEvent.click(removeButton);
    
        // Verifica se a tarefa foi removida
        expect(screen.queryByTestId("item-flrGI")).not.toBeInTheDocument();
    });
    it("Requisito 7-Ao clicar duas vezes em um item, deve apresentar o modo de edição de uma tarefa.",()=>{
        renderWithContext(tasksMock);

        const task = screen.getByTestId("item-flrGI")
        const inputTask = task.querySelector(".edit") as HTMLInputElement
        expect(inputTask.value).toBe("Lavar os pratos")
        fireEvent.doubleClick(task.querySelector("label") as HTMLLabelElement)
        fireEvent.change(inputTask, { target: { value: "Nova tarefa" } });
        fireEvent.keyDown(inputTask, { key: "Enter", code: "Enter" });
        expect(inputTask.value).toBe("Nova tarefa")

    })

    

})