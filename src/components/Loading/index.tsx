import { LoadingContainer } from "./styles";
const Loading = ({ lines }: { lines: number }) => {
  return (
    <>
      {[...Array(lines)].map((item) => (
        <LoadingContainer key={item}>
          <div></div>
        </LoadingContainer>
      ))}
    </>
  );
};

export default Loading;
