import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../utils/renderWithTheme";
import Loading from ".";

describe("Loading component", () => {
  it("Should render componente", () => {
    renderWithTheme(<Loading lines={1} />);

    const animation = screen.getByRole("LoadingAnimation");
    expect(animation).toBeInTheDocument();
  });

  it("Should render the exact number of lines", () => {
    renderWithTheme(<Loading lines={5} />);

    const animation = screen.getAllByRole("LoadingAnimation");
    expect(animation.length).toBe(5);
  });

  it("Should not render any loading if 0 is passed", () => {
    renderWithTheme(<Loading lines={0} />);

    const animation = screen.queryAllByRole("LoadingAnimation");
    expect(animation.length).toBe(0);
  });
});
