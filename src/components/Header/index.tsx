import Title from "../Title";

type HeaderProps = {
  titleText: string;
}

const Header = ({titleText}: HeaderProps) => {
  return (
    <header>
      <Title text={titleText} />
    </header>
  );
};

export default Header;
