import React from "react";
import { render, screen } from "@testing-library/react";
import { Info } from "./Info";

describe("Info", () => {
  it("should render information text", () => {
    render(<Info />);

    expect(screen.getByText("Double-click to edit a todo")).toBeInTheDocument();

    const createdByLink = screen.getByRole("link", { name: /pedro silva/i });
    expect(createdByLink).toHaveAttribute(
      "href",
      "https://github.com/pedrovs3"
    );

    const todoMvcLink = screen.getByRole("link", { name: /todomvc/i });
    expect(todoMvcLink).toHaveAttribute("href", "http://todomvc.com");
  });
});
