import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock child components
jest.mock('./components/TodoList', () => {
  return function MockTodoList({ todos, setTodos }) {
    return (
      <div data-testid="todo-list">
        <h2>Tasks</h2>
        <div>Todo count: {todos.length}</div>
      </div>
    );
  };
});

jest.mock('./components/NotesPanel', () => {
  return function MockNotesPanel({ notes, setNotes }) {
    return (
      <div data-testid="notes-panel">
        <h3>Quick Notes</h3>
        <div>Notes count: {notes.length}</div>
      </div>
    );
  };
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('renders app header', () => {
    render(<App />);
    expect(screen.getByText('Productivity Hub')).toBeInTheDocument();
  });

  test('renders TodoList component', () => {
    render(<App />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('renders NotesPanel component', () => {
    render(<App />);
    expect(screen.getByTestId('notes-panel')).toBeInTheDocument();
    expect(screen.getByText('Quick Notes')).toBeInTheDocument();
  });

  test('loads todos from localStorage on mount', async () => {
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false, createdAt: '2024-01-01T00:00:00.000Z' }
    ];
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'todos') return JSON.stringify(mockTodos);
      return null;
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Todo count: 1')).toBeInTheDocument();
    });
  });

  test('loads notes from localStorage on mount', async () => {
    const mockNotes = [
      { id: 1, content: 'Test note', createdAt: '2024-01-01T00:00:00.000Z' }
    ];
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'notes') return JSON.stringify(mockNotes);
      return null;
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Notes count: 1')).toBeInTheDocument();
    });
  });

  test('handles invalid localStorage data gracefully', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      return 'invalid json';
    });

    // Should not throw an error
    expect(() => render(<App />)).not.toThrow();
    
    // Should show empty state
    expect(screen.getByText('Todo count: 0')).toBeInTheDocument();
    expect(screen.getByText('Notes count: 0')).toBeInTheDocument();
  });

  test('initializes with empty arrays when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(<App />);

    expect(screen.getByText('Todo count: 0')).toBeInTheDocument();
    expect(screen.getByText('Notes count: 0')).toBeInTheDocument();
  });

  test('has correct CSS classes for layout', () => {
    render(<App />);
    
    const app = screen.getByText('Productivity Hub').closest('.app');
    expect(app).toBeInTheDocument();
    
    const header = screen.getByText('Productivity Hub').closest('.app-header');
    expect(header).toBeInTheDocument();
  });

  test('localStorage getItem is called for todos and notes', () => {
    render(<App />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith('todos');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('notes');
  });
});

// Integration test without mocked components
describe('App Component Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('renders complete app structure', () => {
    // Don't mock child components for this test
    jest.unmock('./components/TodoList');
    jest.unmock('./components/NotesPanel');
    
    render(<App />);

    // Check main structure
    expect(screen.getByText('Productivity Hub')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Quick Notes')).toBeInTheDocument();
    
    // Check initial empty states
    expect(screen.getByText('No tasks yet. Add one above!')).toBeInTheDocument();
    expect(screen.getByText('No notes yet!')).toBeInTheDocument();
    
    // Check input elements
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByText('+ New Note')).toBeInTheDocument();
  });
});