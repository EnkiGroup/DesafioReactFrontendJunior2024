import React from 'react';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe('App Component', () => {
  it('renders App component correctly', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('todos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('Double-click to edit a todo')).toBeInTheDocument();
  });

  it('navigates to active route', () => {
    render(
      <MemoryRouter initialEntries={["/active"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('navigates to completed route', () => {
    render(
      <MemoryRouter initialEntries={["/completed"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });
});
