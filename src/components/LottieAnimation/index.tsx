import Lottie from "react-lottie";
import AnimaContainer from "./styled";
import todoMV2animation from "../../assets/animation/todoMVC2Animation.json";
import { useEffect } from "react";

type LottieAnimationProps = {
  onComplete: () => void;
};

const LottieAnimation = ({ onComplete }: LottieAnimationProps) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: todoMV2animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 2000);
  }, [onComplete]);

  return (
    <AnimaContainer role="animaLottie">
      <Lottie options={defaultOptions} height={500} width={500} />
    </AnimaContainer>
  );
};

export default LottieAnimation;
