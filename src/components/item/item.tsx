interface TodoItemProps {
  title: string;
  isDone: boolean;
  onToggle: () => void;
}

export default function TodoItem({title, isDone, onToggle}: TodoItemProps) {

  const inputbox =
    "block w-1/3 p-4 focus:ring-0 mx-auto bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2 align-bottom";
  
  return (
    <div>
      {isDone ? (
        <div className="relative">
          <input className={inputbox} type="text" value={title} />
        </div>
      ) : (
        <div className={inputbox}>
          <input
            className="custom-checkbox appearance-none focus:ring-0 w-8 h-8 border-gray-500 rounded-full cursor-pointer checked:border-green-500 bg-white checked:bg-white checked:focus:bg-white checked:hover:bg-white checked:focus:border-green-500 checked:hover:border-green-500"
            type="checkbox"
            checked={isDone}
            onChange={onToggle}
          />
          <label htmlFor="checkbox"></label>
          <span className="ml-12 line-through max-w-1/3 text-gray-500">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
