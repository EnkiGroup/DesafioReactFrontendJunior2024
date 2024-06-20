export default function Filterbar() {
  const filterbarStyles = "w-1/3 mx-auto bg-white drop-shadow-md text-2xl border-gray-300 border-solid border-2 align-bottom flex justify-between items-center";
  const textStyles = "text-center text-[14px] mx-2 p-2 py-0";
  const buttonStyles = "text-center text-[14px] mx-2 p-2 py-0 hover:border-red-700 active:border-red-700 active:border-2 hover:border-2";
  const buttonGroupStyles = "flex justify-between items-center";
  return (
    <div className={filterbarStyles}>
      <span className={textStyles}>1 item left!</span>
      <div className={buttonGroupStyles}>
        <button className={buttonStyles}>All</button>
        <button className={buttonStyles}>Active</button>
        <button className={buttonStyles}>Completed</button>
      </div>
      <button className={textStyles + ` hover:underline`}>
        Clear Completed
      </button>
    </div>
  );
}