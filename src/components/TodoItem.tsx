import { Todo } from "../types/Todo"

type TodoProps = {
    todo: Todo;
    handleDeleteTodo: (id: number) => void;
    handleToggleActive: (id: number) => void;
}

export default function TodoItem({ todo, handleDeleteTodo, handleToggleActive }: TodoProps) {
    return (

        <div className="flex justify-between items-center">
            <div 
                id="toggle-active" 
                className="relative flex items-center justify-center h-11 w-14" 
                onClick={() => handleToggleActive(todo.id)}
                >
                <input
                    type="checkbox"
                    className={`absolute left-2 appearance-none rounded-full h-5 w-5 border ${todo.isActive ? "border-green-800" : "border-gray-500"}`}
                />
                <div id="check-icon" className="absolute top-[-2px] right-[3px] flex justify-center items-center h-full w-11">
                    <div className={`border-green-800 border-b-2 border-r-2 h-3 w-2 rotate-45 transform ${todo.isActive ? "" : "hidden"}`}></div>
                </div>
            </div>


            <div className="bg-white w-full pl-4 " >
                {todo.description}
            </div>
            <div id="delete" className="flex justify-center items-center h-full w-11">
                <p onClick={() => handleDeleteTodo(todo.id)} className="hover:text-gray-500 cursor-pointer active:scale-90">X</p>
            </div>

        </div>


    )
}
