import Input from "../ui/input/Input";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center gap-4 w-[35%]">
      <h1 className="text-title-color text-7xl">todos</h1>
      <Input />
    </header>
  );
};

export default Header;
