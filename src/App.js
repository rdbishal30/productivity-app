import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import NotesPanel from './components/NotesPanel';
import './App.css';

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

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Productivity Hub</h1>
      </header>
      
      <div className="app-content">
        <div className="main-section">
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
        
        <div className="side-panel">
          <NotesPanel notes={notes} setNotes={setNotes} />
        </div>
      </div>
    </div>
  );
}

export default App;