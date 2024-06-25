import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../helper/renderWithTheme";
import { BrowserRouter } from "react-router-dom";

import Filter from ".";

describe("Filter component", () => {
  it("shold render component", () => {
    renderWithTheme(
      <BrowserRouter>
        <Filter />
      </BrowserRouter>,
    );
    const all = screen.getByRole("link", { name: /all/i });
    const active = screen.getByRole("link", { name: /active/i });
    const completed = screen.getByRole("link", { name: /completed/i });

    expect(all).toBeInTheDocument();
    expect(active).toBeInTheDocument();
    expect(completed).toBeInTheDocument();
  });

  it("shold render text when itensList is passed", () => {
    renderWithTheme(
      <BrowserRouter>
        <Filter itensList="item" />
      </BrowserRouter>,
    );
    const item = screen.getByText("item");

    expect(item).toBeInTheDocument();
  });

  it("Should call onClick prop on click", () => {
    const onClick = jest.fn();
    renderWithTheme(
      <BrowserRouter>
        <Filter handleCompletedClick={onClick} />
      </BrowserRouter>,
    );

    const clearCompleted = screen.getByText("Clear completed");

    fireEvent.click(clearCompleted);

    expect(onClick).toHaveBeenCalled();
  });
});
