/**
 * @jest-environment jsdom
 */
import React from "react";
import TaskList from "../Components/TaskList";
import { fireEvent, getAllByAltText, render } from "@testing-library/react";
import '@testing-library/jest-dom'
import CardSettings from "../Components/CardSettings";
import { MemoryRouter } from "react-router-dom";

test('renders tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    const { getByText } = render(
        <MemoryRouter>
            <TaskList
                tasks={tasks}
                setTasks={() => { }}
                filter='all'
                setFilter={() => { }}
                completedTasks={{ 'Task 1': false, 'Task 2': false, 'Task 3': false }}
                setCompletedTasks={() => { }}
            />
        </MemoryRouter>
    );

    tasks.forEach(task => {
        expect(getByText(task)).toBeInTheDocument();
    });
});

test('renders checkboxes for tasks', () => {

    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    const { getAllByTestId } = render(
        <MemoryRouter>
            <TaskList
                tasks={tasks}
                setTasks={() => { }}
                filter='all'
                setFilter={() => { }}
                completedTasks={{ 'Task 1': false, 'Task 2': false, 'Task 3': false }}
                setCompletedTasks={() => { }}
            />
        </MemoryRouter>
    );

    const checkboxes = getAllByTestId('task-checkbox');

    expect(checkboxes.length).toBe(tasks.length);
});

test('updates task completion status when checkbox is clicked', () => {
    const tasks = ['Task 1'];
    const setCompletedTasks = jest.fn();
    const { getByTestId } = render(
        <MemoryRouter>
            <TaskList
                tasks={tasks}
                setTasks={() => { }}
                filter='all'
                setFilter={() => { }}
                completedTasks={{ 'Task 1': false }}
                setCompletedTasks={setCompletedTasks}
            />
        </MemoryRouter>

    );

    const checkbox = getByTestId('task-checkbox');
    fireEvent.click(checkbox);

    // Check that setCompletedTasks was called with a function
    expect(typeof setCompletedTasks.mock.calls[0][0]).toBe('function');
});

test('updates filter when select value is changed', () => {
    const setFilter = jest.fn();

    const { getByText } = render(
        <MemoryRouter>
            <CardSettings
                filter='all'
                setFilter={setFilter}
                checkedTasksCount={0}
                clearTasks={() => { }}
                tasks={[]}
            />
        </MemoryRouter>
    );
    const select = getByText('Completed');
    fireEvent.click(select);

    expect(setFilter).toHaveBeenCalledWith('completed');
});

test('clears tasks when clear button is clicked', () => {
    const clearTasks = jest.fn();

    const { getByText } = render(
        <MemoryRouter>
            <CardSettings
                filter='all'
                setFilter={() => {'all'}}
                checkedTasksCount={5}
                clearTasks={clearTasks}
                tasks={[]}
            />
        </MemoryRouter>
    );
    
    const clearButton = getByText('Clear Completed');
    fireEvent.click(clearButton);

    expect(clearTasks).toHaveBeenCalled();
});

test('displays the correct number of tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3']
    const { getByText } = render(
        <MemoryRouter>
            <CardSettings
                filter='all'
                setFilter={() => { }}
                checkedTasksCount={0}
                clearTasks={() => { }}
                tasks={tasks}
            />
        </MemoryRouter>
    );
    const taskCount = getByText('3 items left!');
    expect(taskCount).toBeInTheDocument();
});

test('displays only completed tasks when filter is set to "completed"', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3'];
    const { getByText, queryByText } = render(
        <MemoryRouter>
            <TaskList
                tasks={tasks}
                setTasks={() => { }}
                filter='completed'
                setFilter={() => { }}
                completedTasks={{ 'Task 1': true, 'Task 2': false, 'Task 3': false }}
                setCompletedTasks={() => { }}
            />
        </MemoryRouter>
    );

    expect(getByText('Task 1')).toBeInTheDocument();
    expect(queryByText('Task 2')).not.toBeInTheDocument();
    expect(queryByText('Task 3')).not.toBeInTheDocument();
});