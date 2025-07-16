import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotesPanel from './NotesPanel';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('NotesPanel Component', () => {
  const mockNotes = [
    {
      id: 1,
      content: 'Test note 1',
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      content: 'Test note 2',
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  const mockSetNotes = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders notes panel with heading', () => {
    render(<NotesPanel notes={[]} setNotes={mockSetNotes} />);
    expect(screen.getByText('Quick Notes')).toBeInTheDocument();
  });

  test('renders add note button', () => {
    render(<NotesPanel notes={[]} setNotes={mockSetNotes} />);
    expect(screen.getByText('+ New Note')).toBeInTheDocument();
  });

  test('displays empty state when no notes', () => {
    render(<NotesPanel notes={[]} setNotes={mockSetNotes} />);
    expect(screen.getByText('No notes yet!')).toBeInTheDocument();
  });

  test('renders existing notes', () => {
    render(<NotesPanel notes={mockNotes} setNotes={mockSetNotes} />);
    
    const textareas = screen.getAllByRole('textbox');
    expect(textareas).toHaveLength(2);
    expect(textareas[0]).toHaveValue('Test note 1');
    expect(textareas[1]).toHaveValue('Test note 2');
  });

  test('adds new note when add button is clicked', () => {
    render(<NotesPanel notes={[]} setNotes={mockSetNotes} />);
    
    const addButton = screen.getByText('+ New Note');
    fireEvent.click(addButton);

    expect(mockSetNotes).toHaveBeenCalledWith(expect.any(Function));
  });

  test('updates note content when textarea changes', () => {
    render(<NotesPanel notes={mockNotes} setNotes={mockSetNotes} />);
    
    const textareas = screen.getAllByRole('textbox');
    fireEvent.change(textareas[0], { target: { value: 'Updated note content' } });

    expect(mockSetNotes).toHaveBeenCalledWith(expect.any(Function));
  });

  test('deletes note when delete button is clicked', () => {
    render(<NotesPanel notes={mockNotes} setNotes={mockSetNotes} />);
    
    const deleteButtons = screen.getAllByText('×');
    fireEvent.click(deleteButtons[0]);

    expect(mockSetNotes).toHaveBeenCalledWith(expect.any(Function));
  });

  test('renders correct number of delete buttons', () => {
    render(<NotesPanel notes={mockNotes} setNotes={mockSetNotes} />);
    
    const deleteButtons = screen.getAllByText('×');
    expect(deleteButtons).toHaveLength(2);
  });

  test('textarea has correct placeholder text', () => {
    render(<NotesPanel notes={mockNotes} setNotes={mockSetNotes} />);
    
    const textareas = screen.getAllByPlaceholderText('Write your note here...');
    expect(textareas).toHaveLength(2);
  });

  test('new note is added with empty content', () => {
    const mockSetNotesCallback = jest.fn();
    render(<NotesPanel notes={[]} setNotes={mockSetNotesCallback} />);
    
    const addButton = screen.getByText('+ New Note');
    fireEvent.click(addButton);

    expect(mockSetNotesCallback).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the callback function
    const callbackFunction = mockSetNotesCallback.mock.calls[0][0];
    const result = callbackFunction([]);
    
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: expect.any(Number),
      content: '',
      createdAt: expect.any(String)
    });
  });

  test('note update preserves other notes', () => {
    const mockSetNotesCallback = jest.fn();
    render(<NotesPanel notes={mockNotes} setNotes={mockSetNotesCallback} />);
    
    const textareas = screen.getAllByRole('textbox');
    fireEvent.change(textareas[0], { target: { value: 'Updated content' } });

    expect(mockSetNotesCallback).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the callback function
    const callbackFunction = mockSetNotesCallback.mock.calls[0][0];
    const result = callbackFunction(mockNotes);
    
    expect(result).toHaveLength(2);
    expect(result[0].content).toBe('Updated content');
    expect(result[1].content).toBe('Test note 2'); // Unchanged
  });

  test('note deletion removes correct note', () => {
    const mockSetNotesCallback = jest.fn();
    render(<NotesPanel notes={mockNotes} setNotes={mockSetNotesCallback} />);
    
    const deleteButtons = screen.getAllByText('×');
    fireEvent.click(deleteButtons[0]);

    expect(mockSetNotesCallback).toHaveBeenCalledWith(expect.any(Function));
    
    // Test the callback function
    const callbackFunction = mockSetNotesCallback.mock.calls[0][0];
    const result = callbackFunction(mockNotes);
    
    expect(result).toHaveLength(1);
    expect(result[0].content).toBe('Test note 2');
  });

  test('handles empty notes array gracefully', () => {
    render(<NotesPanel notes={[]} setNotes={mockSetNotes} />);
    
    expect(screen.getByText('No notes yet!')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});