import { Todo } from "../types/Todo"

export default function TodoItem({ id, description, isActive }: Todo) {
    return (
        
            <div className="flex justify-between items-center">
                <div id="toggle-active" className="flex justify-center h-11 w-14">
                    <input type="checkbox" />
                </div>
                <div className="bg-white w-full pl-4 " >
                    {description}
                </div>
                <div id="delete" className="flex justify-center items-center h-full w-11">
                    <p className="hover:text-gray-500 cursor-pointer active:scale-90">X</p>
                </div>

            </div>

     
    )
}
