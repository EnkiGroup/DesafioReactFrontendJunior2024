import { LoadingContainer, AnimationSkeleton } from "./styles";
const Loading = ({ lines }: { lines: number }) => {
  return (
    <>
      {[...Array(lines)]?.map((item) => (
        <LoadingContainer key={item}>
          <AnimationSkeleton role="LoadingAnimation"></AnimationSkeleton>
        </LoadingContainer>
      ))}
    </>
  );
};

export default Loading;
