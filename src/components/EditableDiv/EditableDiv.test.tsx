import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditableDiv } from "./EditableDiv";

describe("EditableDiv", () => {
  it("should render with default text", () => {
    render(<EditableDiv defaultText="Test Todo" />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("should enter edit mode on double click", () => {
    render(<EditableDiv defaultText="Test Todo" />);
    fireEvent.doubleClick(screen.getByText("Test Todo"));
    expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument();
  });

  it("should save text on enter and exit edit mode", () => {
    render(<EditableDiv defaultText="Test Todo" />);
    fireEvent.doubleClick(screen.getByText("Test Todo"));
    const input = screen.getByDisplayValue("Test Todo");
    fireEvent.change(input, { target: { value: "Updated Todo" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Updated Todo")).toBeInTheDocument();
  });
});
