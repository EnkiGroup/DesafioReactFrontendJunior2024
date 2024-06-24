import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';

import { FilterButton } from '../../components/filter-button';

describe('FilterButton', () => {
  test('renders filter button with correct text', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <FilterButton route="/home" filterName="Home" />
      </MemoryRouter>
    );

    const filterButton = screen.getByText('Home');
    expect(filterButton).toBeInTheDocument();
  });

  test('selects filter on route match', () => {
    render(
      <MemoryRouter initialEntries={['/active']}>
        <FilterButton route="/active" filterName="Active" />
      </MemoryRouter>
    );

    const filterInput = screen.getByRole('radio');
    expect(filterInput).toBeChecked();

    const filterLabel = screen.getByText('Active');
    expect(filterLabel).toHaveStyle({ "borderColor": "rgb(254 202 202)" })
  });

  test('deselects filter on route mismatch', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <FilterButton route="/completed" filterName="Completed" />
      </MemoryRouter>
    );

    const filterInput = screen.getByRole('radio');
    expect(filterInput).not.toBeChecked();

    const filterLabel = screen.getByText('Completed');
    expect(filterLabel).toHaveStyle({ "borderColor": "" })
  });

  test('changes route on filter button click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <FilterButton route="/completed" filterName="Completed" />
      </MemoryRouter>
    );

    const filterInput = screen.getByRole('radio');
    expect(filterInput).not.toBeChecked();

    const navigateButton = screen.getByTestId("navigate-button")

    fireEvent.click(navigateButton);

    expect(filterInput).toBeChecked();
  });
});
