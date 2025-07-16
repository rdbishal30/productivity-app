import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('TodoList Component', () => {
    const mockTodos = [
        {
            id: 1,
            text: 'Test todo 1',
            completed: false,
            createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
            id: 2,
            text: 'Test todo 2',
            completed: true,
            createdAt: '2024-01-01T00:00:00.000Z'
        }
    ];

    const mockSetTodos = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders todo list with tasks heading', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />);
        expect(screen.getByText('Tasks')).toBeInTheDocument();
    });

    test('renders add todo input and button', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />);
        expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    test('displays empty state when no todos', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />);
        expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument();
    });

    test('renders existing todos', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);
        expect(screen.getByText('Test todo 1')).toBeInTheDocument();
        expect(screen.getByText('Test todo 2')).toBeInTheDocument();
    });

    test('adds new todo when add button is clicked', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />);

        const input = screen.getByPlaceholderText('Add a new task...');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'New test todo' } });
        fireEvent.click(addButton);

        expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    });

    test('adds new todo when Enter key is pressed', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />);

        const input = screen.getByPlaceholderText('Add a new task...');

        fireEvent.change(input, { target: { value: 'New test todo' } });
        fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });

        expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    });

    test('does not add empty todo', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />);

        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        expect(mockSetTodos).not.toHaveBeenCalled();
    });

    test('toggles todo completion status', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);

        expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    });

    test('deletes todo when delete button is clicked', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);

        expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    });

    test('enters edit mode when edit button is clicked', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        expect(screen.getByDisplayValue('Test todo 1')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('saves edited todo when save button is clicked', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        const editInput = screen.getByDisplayValue('Test todo 1');
        fireEvent.change(editInput, { target: { value: 'Updated todo' } });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    });

    test('cancels edit mode when cancel button is clicked', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(screen.queryByDisplayValue('Test todo 1')).not.toBeInTheDocument();
        expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    });

    test('saves edit when Enter key is pressed in edit mode', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        const editInput = screen.getByDisplayValue('Test todo 1');
        fireEvent.change(editInput, { target: { value: 'Updated todo' } });
        fireEvent.keyPress(editInput, { key: 'Enter', charCode: 13 });

        expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
    });

    test('cancels edit when Escape key is pressed in edit mode', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        const editInput = screen.getByDisplayValue('Test todo 1');
        fireEvent.keyPress(editInput, { key: 'Escape', charCode: 27 });

        expect(screen.queryByDisplayValue('Test todo 1')).not.toBeInTheDocument();
        expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    });

    test('does not show edit button for completed todos', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const editButtons = screen.getAllByText('Edit');
        expect(editButtons).toHaveLength(1); // Only one edit button for uncompleted todo
    });

    test('applies completed styling to completed todos', () => {
        render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

        const completedTodo = screen.getByText('Test todo 2');
        expect(completedTodo).toHaveClass('completed');
    });

    test('limits todo text to 100 characters', () => {
        render(<TodoList todos={[]} setTodos={mockSetTodos} />);

        const input = screen.getByPlaceholderText('Add a new task...');
        expect(input).toHaveAttribute('maxLength', '100');
    });
});