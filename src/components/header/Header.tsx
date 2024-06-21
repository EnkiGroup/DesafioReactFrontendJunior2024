import Input from "../ui/input/Input";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-title-color text-8xl">todos</h1>
      <Input
        input_cn="focus:shadow-focus border p-default placeholder:italic placeholder:text-2xl placeholder:font-light shadow-inner"
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
