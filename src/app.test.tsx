import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./app";

describe("App", () => {
  it("should render TodosPage by default", () => {
    render(<App />);
    expect(screen.getByText("Todos")).toBeInTheDocument();
  });
});
