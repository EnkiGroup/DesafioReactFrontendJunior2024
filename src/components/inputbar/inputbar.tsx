
export default function Inputbar() {
  return (
    <div>
      <input
        type="text"
        placeholder="What needs to be done?"
        className="block w-1/3 p-4 focus:ring-0 mx-auto bg-white drop-shadow-md text-2xl focus:border-red-700 active:border-red-700 border-gray-300 border-solid border-2 align-bottom "
      />
    </div>
  );
}
