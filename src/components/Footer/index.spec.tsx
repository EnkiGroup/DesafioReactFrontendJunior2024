import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../helper/renderWithTheme";
import Footer from ".";

describe("Footer component", () => {
  it("shold render component", () => {
    renderWithTheme(<Footer />);

    const value = screen.getByText(/matheus leite/i);

    expect(value).toBeInTheDocument();
  });

  it("Shold have a link", () => {
    renderWithTheme(<Footer />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });

  it("Shold have a link for github and _blank attribute", () => {
    renderWithTheme(<Footer />);

    const link = screen.getByRole("link", { name: /matheus leite/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/matheusleite01");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });
});
