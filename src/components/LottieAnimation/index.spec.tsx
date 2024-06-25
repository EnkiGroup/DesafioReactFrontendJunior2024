import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../utils/renderWithTheme";
import LottieAnimation from ".";

const handleClick = jest.fn();

describe.skip("Lottie component", () => {
  it("Should render component", () => {
    renderWithTheme(<LottieAnimation onComplete={handleClick} />);

    const animaLottie = screen.getByRole("animaLottie");

    expect(animaLottie).toBeInTheDocument();
  });

  it("Should call handleClick when onComplete is passed", () => {
    renderWithTheme(<LottieAnimation onComplete={handleClick} />);

    const animaLottie = screen.getByRole("animaLottie");

    fireEvent.click(animaLottie);

    expect(handleClick).toHaveBeenCalled();
  });
});