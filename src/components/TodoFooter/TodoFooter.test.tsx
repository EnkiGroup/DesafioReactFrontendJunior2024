import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoFooter } from "./TodoFooter";
import { BrowserRouter as Router } from "react-router-dom";

describe("TodoFooter", () => {
  const setup = (filter: string) => {
    const onClearCompleted = jest.fn();
    render(
      <Router>
        <TodoFooter
          remainingCount={3}
          filter={filter}
          onClearCompleted={onClearCompleted}
        />
      </Router>
    );
    return { onClearCompleted };
  };

  it("should render the correct remaining count", () => {
    setup("all");
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "3 item(s) left";
      })
    ).toBeInTheDocument();
  });

  it("should have the correct filter selected", () => {
    setup("active");
    expect(screen.getByText("Active").closest("li")).toHaveClass(
      "filtersItemSelected"
    );
  });

  it("should call onClearCompleted when button is clicked", () => {
    const { onClearCompleted } = setup("all");
    fireEvent.click(screen.getByText("Clear completed"));
    expect(onClearCompleted).toHaveBeenCalledTimes(1);
  });
});
