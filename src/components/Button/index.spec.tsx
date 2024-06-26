import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../helper/renderWithTheme";
import { BrowserRouter } from "react-router-dom";
import Button from ".";

describe("Button component", () => {
  it("shold render component", () => {
    renderWithTheme(
      <BrowserRouter>
        <Button to={"about"}>ativar</Button>
      </BrowserRouter>,
    );

    const buttonLink = screen.getByRole("link", { name: /ativar/i });

    expect(buttonLink).toBeInTheDocument();
  });

  it("Shold have a link /about", () => {
    renderWithTheme(
      <BrowserRouter>
        <Button to={"about"}>ativar</Button>
      </BrowserRouter>,
    );

    const buttonLink = screen.getByRole("link", { name: /ativar/i });

    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).toHaveAttribute("href", "/about");
  });

  it("Shold have border color when active is passed", () => {
    renderWithTheme(
      <BrowserRouter>
        <Button className={"active"} to={"about"}>
          ativar
        </Button>
      </BrowserRouter>,
    );

    const buttonLink = screen.getByRole("link", { name: /ativar/i });

    expect(buttonLink).toHaveStyle({ border: `1px solid #b83f45` });
  });
});
