import { fireEvent, render, screen } from "@testing-library/react";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("Should be filled with a value when typed in the input", () => {
    render(<App />, { wrapper: BrowserRouter });

    const input = screen.getByPlaceholderText(
      /What needs to be done?/i,
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Buy Groceries" } });
    expect(input.value).toBe("Buy Groceries");
  });

  it("Should be empty when the input is submitted", () => {
    render(<App />, { wrapper: BrowserRouter });

    const input = screen.getByPlaceholderText(
      /What needs to be done?/i,
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Buy Groceries" } });
    fireEvent.submit(input);
    expect(input.value).toBe("");
  });

  it("Should render the finish all button", () => {
    render(<App />, { wrapper: BrowserRouter });

    const finishAllButton = screen.getByTitle(/Finish all/i);
    expect(finishAllButton).toBeInTheDocument();
  });
});
