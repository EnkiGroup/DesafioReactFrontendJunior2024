import Lottie from "react-lottie";
import AnimaContainer from "./styled";
import todoMV2animation from "../../assets/animation/todoMVC2Animation.json";
import { useEffect } from "react";
import { animationDefaultValues } from "../../utils/animationDefaultValues";

type LottieAnimationProps = {
  onComplete: () => void;
};

const LottieAnimation = ({ onComplete }: LottieAnimationProps) => {

  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 2000);
  }, [onComplete]);

  return (
    <AnimaContainer role="animaLottie">
      <Lottie options={animationDefaultValues(todoMV2animation)} height={500} width={500} />
    </AnimaContainer>
  );
};

export default LottieAnimation;
