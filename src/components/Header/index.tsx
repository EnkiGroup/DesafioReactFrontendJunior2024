import Title from "../Title";

type HeaderProps = {
  titleText: string;
};

const Header = ({ titleText }: HeaderProps) => {
  return (
    <header>
      <Title>{titleText}</Title>
    </header>
  );
};

export default Header;
