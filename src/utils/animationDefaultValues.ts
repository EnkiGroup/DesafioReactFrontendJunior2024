export const animationDefaultValues = (animation: object, className?: string) => {
  return {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      className: className,
    },
  };
};
