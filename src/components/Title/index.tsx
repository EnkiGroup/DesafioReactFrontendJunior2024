import TitleContainer from "./styled";

type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return <TitleContainer>{text}</TitleContainer>;
};

export default Title;
