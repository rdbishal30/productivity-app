# Function Documentation

## Overview

This document provides detailed documentation for all functions and methods used in the Productivity Hub application.

## App.js Functions

### Main Component Functions

#### `App()`
**Description**: Main application component that manages global state and renders child components.

**Returns**: `JSX.Element` - The main application layout

**State Management**:
- `todos`: Array of todo items
- `notes`: Array of note items

**Side Effects**:
- Loads data from localStorage on mount
- Saves data to localStorage when state changes

```javascript
function App() {
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  
  // Load data from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedNotes = localStorage.getItem('notes');
    
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);
  
  // Auto-save functionality
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
}
```

## TodoList.js Functions

### State Management Functions

#### `TodoList({ todos, setTodos })`
**Description**: Component for managing todo items with full CRUD operations.

**Parameters**:
- `todos` (Array): Array of todo objects
- `setTodos` (Function): State setter function for todos

**Local State**:
- `newTodo` (string): Input value for new todo
- `editingId` (number|null): ID of currently editing todo
- `editText` (string): Text value during editing

### Core Todo Functions

#### `addTodo()`
**Description**: Creates and adds a new todo item to the list.

**Behavior**:
- Validates input is not empty
- Creates todo object with unique ID
- Adds to beginning of todos array
- Clears input field

**Implementation**:
```javascript
const addTodo = () => {
  if (!newTodo.trim()) return;

  const todo = {
    id: Date.now(),
    text: newTodo.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  setTodos(prev => [todo, ...prev]);
  setNewTodo('');
};
```

#### `toggleTodo(id)`
**Description**: Toggles the completion status of a todo item.

**Parameters**:
- `id` (number): Unique identifier of the todo item

**Behavior**:
- Finds todo by ID
- Toggles completed status
- Preserves all other properties

**Implementation**:
```javascript
const toggleTodo = (id) => {
  setTodos(prev => prev.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};
```

#### `deleteTodo(id)`
**Description**: Removes a todo item from the list.

**Parameters**:
- `id` (number): Unique identifier of the todo item

**Behavior**:
- Filters out todo with matching ID
- Updates state with filtered array

**Implementation**:
```javascript
const deleteTodo = (id) => {
  setTodos(prev => prev.filter(todo => todo.id !== id));
};
```

### Edit Mode Functions

#### `startEdit(id, text)`
**Description**: Enters edit mode for a specific todo item.

**Parameters**:
- `id` (number): Unique identifier of the todo item
- `text` (string): Current text of the todo item

**Behavior**:
- Sets editing ID to current todo
- Populates edit text with current value
- Triggers re-render with edit UI

**Implementation**:
```javascript
const startEdit = (id, text) => {
  setEditingId(id);
  setEditText(text);
};
```

#### `saveEdit(id)`
**Description**: Saves the edited todo text and exits edit mode.

**Parameters**:
- `id` (number): Unique identifier of the todo item

**Behavior**:
- Validates edit text is not empty
- Updates todo with new text
- Exits edit mode
- Clears edit state

**Implementation**:
```javascript
const saveEdit = (id) => {
  if (!editText.trim()) return;
  
  setTodos(prev => prev.map(todo => 
    todo.id === id ? { ...todo, text: editText.trim() } : todo
  ));
  setEditingId(null);
  setEditText('');
};
```

#### `cancelEdit()`
**Description**: Cancels edit mode without saving changes.

**Behavior**:
- Resets editing ID to null
- Clears edit text
- Returns to view mode

**Implementation**:
```javascript
const cancelEdit = () => {
  setEditingId(null);
  setEditText('');
};
```

### Event Handler Functions

#### `handleKeyPress(e, action, id)`
**Description**: Handles keyboard shortcuts for todo operations.

**Parameters**:
- `e` (Event): Keyboard event object
- `action` (string): Action type ('add' or 'save')
- `id` (number, optional): Todo ID for save action

**Supported Keys**:
- `Enter`: Execute action (add or save)
- `Escape`: Cancel current operation

**Implementation**:
```javascript
const handleKeyPress = (e, action, id) => {
  if (e.key === 'Enter') {
    if (action === 'add') addTodo();
    if (action === 'save') saveEdit(id);
  }
  if (e.key === 'Escape' && action === 'save') {
    cancelEdit();
  }
};
```

## NotesPanel.js Functions

### Core Note Functions

#### `NotesPanel({ notes, setNotes })`
**Description**: Component for managing sticky notes with auto-save functionality.

**Parameters**:
- `notes` (Array): Array of note objects
- `setNotes` (Function): State setter function for notes

#### `addNote()`
**Description**: Creates a new empty note and adds it to the list.

**Behavior**:
- Creates note object with unique ID
- Initializes with empty content
- Adds to beginning of notes array

**Implementation**:
```javascript
const addNote = () => {
  const note = {
    id: Date.now(),
    content: '',
    createdAt: new Date().toISOString()
  };

  setNotes(prev => [note, ...prev]);
};
```

#### `updateNote(id, content)`
**Description**: Updates the content of a specific note.

**Parameters**:
- `id` (number): Unique identifier of the note
- `content` (string): New content for the note

**Behavior**:
- Finds note by ID
- Updates content property
- Triggers auto-save to localStorage

**Implementation**:
```javascript
const updateNote = (id, content) => {
  setNotes(prev => prev.map(note => 
    note.id === id ? { ...note, content } : note
  ));
};
```

#### `deleteNote(id)`
**Description**: Removes a note from the list.

**Parameters**:
- `id` (number): Unique identifier of the note

**Behavior**:
- Filters out note with matching ID
- Updates state with filtered array

**Implementation**:
```javascript
const deleteNote = (id) => {
  setNotes(prev => prev.filter(note => note.id !== id));
};
```

## Utility Functions

### Data Validation Functions

#### `escapeHtml(text)`
**Description**: Escapes HTML characters to prevent XSS attacks.

**Parameters**:
- `text` (string): Text to escape

**Returns**: `string` - HTML-escaped text

**Implementation**:
```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### LocalStorage Functions

#### `loadFromStorage(key)`
**Description**: Safely loads and parses data from localStorage.

**Parameters**:
- `key` (string): localStorage key

**Returns**: `Array|null` - Parsed data or null if not found

**Error Handling**: Returns empty array if JSON parsing fails

**Implementation**:
```javascript
const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);
    return [];
  }
};
```

#### `saveToStorage(key, data)`
**Description**: Safely saves data to localStorage with error handling.

**Parameters**:
- `key` (string): localStorage key
- `data` (any): Data to save

**Error Handling**: Logs error if save fails

**Implementation**:
```javascript
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
};
```

## React Hooks Usage

### useState Hook Patterns

#### State Initialization
```javascript
// Simple state
const [todos, setTodos] = useState([]);

// State with default value
const [newTodo, setNewTodo] = useState('');

// Complex state object
const [editState, setEditState] = useState({
  id: null,
  text: '',
  isEditing: false
});
```

#### State Update Patterns
```javascript
// Direct update
setNewTodo('new value');

// Functional update (recommended for arrays/objects)
setTodos(prev => [...prev, newTodo]);

// Conditional update
setTodos(prev => prev.map(todo => 
  todo.id === id ? { ...todo, completed: !todo.completed } : todo
));
```

### useEffect Hook Patterns

#### Component Mount Effect
```javascript
useEffect(() => {
  // Load initial data
  const savedData = localStorage.getItem('todos');
  if (savedData) {
    setTodos(JSON.parse(savedData));
  }
}, []); // Empty dependency array = run once on mount
```

#### State Change Effect
```javascript
useEffect(() => {
  // Save data when state changes
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]); // Dependency array = run when todos change
```

#### Cleanup Effect
```javascript
useEffect(() => {
  const handleBeforeUnload = () => {
    // Save data before page unload
    saveToStorage('notes', notes);
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, [notes]);
```

## Performance Optimization Functions

### Debouncing for Auto-save
```javascript
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

### Memoization for Expensive Calculations
```javascript
const filteredTodos = useMemo(() => {
  return todos.filter(todo => !todo.completed);
}, [todos]);
```

## Error Handling Patterns

### Try-Catch for localStorage Operations
```javascript
const safeLocalStorageOperation = (operation) => {
  try {
    return operation();
  } catch (error) {
    console.error('localStorage operation failed:', error);
    return null;
  }
};
```

### Graceful Degradation
```javascript
const addTodoWithFallback = (text) => {
  try {
    addTodo(text);
  } catch (error) {
    console.error('Failed to add todo:', error);
    // Show user-friendly error message
    showErrorMessage('Failed to add task. Please try again.');
  }
};
```

## Testing Helper Functions

### Mock Data Generators
```javascript
const createMockTodo = (overrides = {}) => ({
  id: Date.now(),
  text: 'Test todo',
  completed: false,
  createdAt: new Date().toISOString(),
  ...overrides
});

const createMockNote = (overrides = {}) => ({
  id: Date.now(),
  content: 'Test note',
  createdAt: new Date().toISOString(),
  ...overrides
});
```

### Test Utilities
```javascript
const renderWithProps = (Component, props = {}) => {
  const defaultProps = {
    todos: [],
    setTodos: jest.fn(),
    notes: [],
    setNotes: jest.fn()
  };
  
  return render(<Component {...defaultProps} {...props} />);
};
```

This comprehensive function documentation provides detailed information about all the functions used in the Productivity Hub application, including their purpose, parameters, behavior, and implementation details.