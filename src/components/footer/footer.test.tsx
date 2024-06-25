import React from 'react';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

describe('Footer Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(getByText('Double-click to edit a todo')).toBeInTheDocument();
    expect(getByText('Inspired on the TodoMVC made by Bruno')).toBeInTheDocument();
    expect(getByText('Bruno')).toBeInTheDocument();
  });
});
