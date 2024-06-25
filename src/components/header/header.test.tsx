import React from 'react';
import { render } from "@testing-library/react";
import { Header } from "./Header";

describe('Header Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('todos')).toBeInTheDocument();
  });
});
