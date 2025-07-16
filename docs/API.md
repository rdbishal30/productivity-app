# API Documentation

## Overview

The Productivity Hub uses browser LocalStorage for data persistence. All operations are client-side with no backend API required.

## Data Models

### Todo Item

```typescript
interface Todo {
  id: number;           // Timestamp-based unique identifier
  text: string;         // Task description (max 100 characters)
  completed: boolean;   // Task completion status
  createdAt: string;    // ISO 8601 timestamp
}
```

### Note Item

```typescript
interface Note {
  id: number;           // Timestamp-based unique identifier
  content: string;      // Note content (unlimited length)
  createdAt: string;    // ISO 8601 timestamp
}
```

## LocalStorage Operations

### Todos

**Key:** `todos`

**Read Todos:**
```javascript
const todos = JSON.parse(localStorage.getItem('todos')) || [];
```

**Save Todos:**
```javascript
localStorage.setItem('todos', JSON.stringify(todos));
```

**Add Todo:**
```javascript
const newTodo = {
  id: Date.now(),
  text: "Task description",
  completed: false,
  createdAt: new Date().toISOString()
};
todos.unshift(newTodo);
localStorage.setItem('todos', JSON.stringify(todos));
```

**Update Todo:**
```javascript
const updatedTodos = todos.map(todo => 
  todo.id === targetId 
    ? { ...todo, completed: !todo.completed }
    : todo
);
localStorage.setItem('todos', JSON.stringify(updatedTodos));
```

**Delete Todo:**
```javascript
const filteredTodos = todos.filter(todo => todo.id !== targetId);
localStorage.setItem('todos', JSON.stringify(filteredTodos));
```

### Notes

**Key:** `notes`

**Read Notes:**
```javascript
const notes = JSON.parse(localStorage.getItem('notes')) || [];
```

**Save Notes:**
```javascript
localStorage.setItem('notes', JSON.stringify(notes));
```

**Add Note:**
```javascript
const newNote = {
  id: Date.now(),
  content: "",
  createdAt: new Date().toISOString()
};
notes.unshift(newNote);
localStorage.setItem('notes', JSON.stringify(notes));
```

**Update Note:**
```javascript
const updatedNotes = notes.map(note => 
  note.id === targetId 
    ? { ...note, content: newContent }
    : note
);
localStorage.setItem('notes', JSON.stringify(updatedNotes));
```

**Delete Note:**
```javascript
const filteredNotes = notes.filter(note => note.id !== targetId);
localStorage.setItem('notes', JSON.stringify(filteredNotes));
```

## Component APIs

### TodoList Component

**Props:**
- `todos: Todo[]` - Array of todo items
- `setTodos: (todos: Todo[]) => void` - State setter function

**Methods:**
- `addTodo()` - Creates new todo from input
- `toggleTodo(id)` - Toggles completion status
- `deleteTodo(id)` - Removes todo item
- `startEdit(id, text)` - Enters edit mode
- `saveEdit(id)` - Saves edited todo
- `cancelEdit()` - Cancels edit mode

### NotesPanel Component

**Props:**
- `notes: Note[]` - Array of note items
- `setNotes: (notes: Note[]) => void` - State setter function

**Methods:**
- `addNote()` - Creates new empty note
- `updateNote(id, content)` - Updates note content
- `deleteNote(id)` - Removes note item

## Event Handling

### Keyboard Shortcuts

**Todo Input:**
- `Enter` - Add new todo
- `Escape` - Clear input (when editing)

**Todo Edit Mode:**
- `Enter` - Save changes
- `Escape` - Cancel editing

### Auto-save

Notes auto-save on every keystroke with debouncing to prevent excessive localStorage writes.

## Error Handling

### LocalStorage Errors

```javascript
try {
  localStorage.setItem('todos', JSON.stringify(todos));
} catch (error) {
  console.error('Failed to save todos:', error);
  // Fallback: Show user notification
}
```

### Data Validation

```javascript
// Validate todo text length
if (todoText.length > 100) {
  console.warn('Todo text exceeds maximum length');
  return;
}

// Validate JSON parsing
try {
  const todos = JSON.parse(localStorage.getItem('todos'));
} catch (error) {
  console.error('Invalid todos data, resetting:', error);
  localStorage.removeItem('todos');
}
```

## Performance Considerations

- **Debounced Updates**: Note updates are debounced to prevent excessive saves
- **Efficient Rendering**: React keys prevent unnecessary re-renders
- **Memory Management**: Large note content is handled efficiently
- **Storage Limits**: LocalStorage has ~5-10MB limit per domain

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome 4+, Firefox 3.5+, Safari 4+)
- **LocalStorage**: Required for data persistence
- **ES6 Features**: Arrow functions, destructuring, template literals
- **React 18**: Concurrent features and automatic batching