/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskList from "../Components/TaskList";
import InputSection from "../Components/InputSection";
jest.mock('../Components/TaskList', () => jest.fn(() => null)); 

describe('InputSection', () => {
    it('submits the input value', () => {
        const { getByPlaceholderText } = render(<InputSection />);
        const input = getByPlaceholderText('What needs to be done?') as HTMLInputElement;
        const form = input.closest('form')!;
        
        fireEvent.change(input, { target: { value: 'New Task'}});
        fireEvent.submit(form);

        expect(TaskList).toHaveBeenCalledWith(
            expect.objectContaining({
                tasks: ['New Task']
            }),
            expect.anything()
        )
    })
    it('changes the input value when typing', () => {
        const { getByPlaceholderText } = render(<InputSection />);
        const input = getByPlaceholderText('What needs to be done?') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'New Task'}});
        expect(input.value).toBe('New Task');
    })
    it('does no render TaskList when there are no tasks', () => {
        const { queryByTestId } = render(<InputSection />);

        expect(queryByTestId('task-list')).toBeNull();
    })
});
