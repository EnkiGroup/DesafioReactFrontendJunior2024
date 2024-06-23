import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CheckAllButton } from '../../components/check-all-button';

import { Task } from '../../types';

describe('CheckAllButton component', () => {
  it("should render chevron icon with correct color when all tasks is completed", () => {
    const tasks: Task[] = [
      {
        "id": "flrGI",
        "title": "Lavar os pratos",
        "isDone": true
      },
      {
        "id": "Tw-I9",
        "title": "Cortar a grama",
        "isDone": true
      },
      {
        "id": "7f2sf",
        "title": "Comprar pão",
        "isDone": true
      }
    ]

    const tasksLeft = tasks.filter(task => task.isDone === false).length

    const onClickMock = jest.fn();

    render(
      <CheckAllButton
        allComplete={Boolean(tasks.length != 0 && tasksLeft == 0)}
        onClick={onClickMock}
      />
    );

    const chevronIcon = screen.getByTestId('chevron-icon');

    expect(chevronIcon).toHaveClass('text-[#333]');
  });

  it('should render chevron icon with correct color when there are tasks left', () => {
    const tasks: Task[] = [
      {
        "id": "flrGI",
        "title": "Lavar os pratos",
        "isDone": false
      },
      {
        "id": "Tw-I9",
        "title": "Cortar a grama",
        "isDone": true
      },
      {
        "id": "7f2sf",
        "title": "Comprar pão",
        "isDone": false
      }
    ]
    const tasksLeft = tasks.filter(task => task.isDone === false).length
    const onClickMock = jest.fn();
    
    render(
      <CheckAllButton
        allComplete={Boolean(tasks.length != 0 && tasksLeft == 0)}
        onClick={onClickMock}
      />
    );

    const chevronIcon = screen.getByTestId('chevron-icon');

    expect(chevronIcon).toHaveClass('text-[#AAA]');
  });

  it('should render chevron icon with correct color when there are no tasks', () => {
    const tasks: Task[] = []
    const tasksLeft = tasks.filter(task => task.isDone === false).length
    const onClickMock = jest.fn();
    
    render(
      <CheckAllButton
        allComplete={Boolean(tasks.length != 0 && tasksLeft == 0)}
        onClick={onClickMock}
      />
    );

    const chevronIcon = screen.getByTestId('chevron-icon');

    expect(chevronIcon).toHaveClass('text-[#AAA]');
  });

  it("should call onClick prop on click", () => {
    const onClickMock = jest.fn();
    render(<CheckAllButton allComplete={false} onClick={onClickMock} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  })
});
