export default function TodoItem() {
  const isSelected = false; // Adjust the logic to make the item editable

  const inputbox = "w-1/3 p-4 mx-auto bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2 align-bottom outline-none focus:outline-none active:outline-none";
  const checkbox = "content-none absolute w-8 h-8 left-5 bottom-4 border-2 accent-slate-50 rounded-full checked:bg-white checked:border-gray-500 checked:accent-green-500 hover:border-gray-500 hover:accent-green-500 hover:border-gray-500 hover:bg-white";

  return (
    <div>
      {isSelected ? (
        <div>
          <input
            className={inputbox}
            type="text"
            value="teste"
          />
        </div>
      ) : (
        <div className={inputbox}>
          <input
            type="checkbox"
            checked
            className={checkbox}
          />
          <span className="ml-12 line-through max-w-1/3">Deixar roupas passadas</span>
        </div>
      )}
    </div>
  );
}
