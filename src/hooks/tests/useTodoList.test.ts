import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useTodoContext } from '../../context/todoContext';
import useTodoList from '../useTodoList';
import { ChangeEvent, KeyboardEvent  } from 'react';

jest.mock('../../context/todoContext', () => ({
    useTodoContext: jest.fn(),
}));

describe('useTodoList hook', () => {
    let mockAddTask: jest.Mock;
    let wrapper: RenderHookResult<undefined, ReturnType<typeof useTodoList>>;

    beforeEach(() => {
        mockAddTask = jest.fn();
        (useTodoContext as jest.Mock).mockReturnValue({
            addTask: mockAddTask,
        });

        wrapper = renderHook(() => useTodoList());
    });

    it('handles key down event correctly', () => {
        const { result } = wrapper;

        act(() => {
            result.current.handleChange({ target: { value: 'Task 1' } } as ChangeEvent<HTMLInputElement>);
        });

        act(() => {
            result.current.handleKeyDown({ key: 'Enter', preventDefault: () => {} } as KeyboardEvent<HTMLInputElement>);
        });

        expect(mockAddTask).toHaveBeenCalledWith('Task 1');
        expect(result.current.newTask).toBe('');
    });

    it('handles change event correctly', () => {
        const { result } = wrapper;

        act(() => {
            result.current.handleChange({ target: { value: 'Task 2' } } as any);
        });

        expect(result.current.newTask).toBe('Task 2');
    });
});
