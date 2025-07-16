import React, { useState } from 'react';

const TodoList = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

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

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e, action, id) => {
    if (e.key === 'Enter') {
      if (action === 'add') addTodo();
      if (action === 'save') saveEdit(id);
    }
    if (e.key === 'Escape' && action === 'save') {
      cancelEdit();
    }
  };

  return (
    <div className="todo-section">
      <h2>Tasks</h2>
      
      <div className="add-todo">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'add')}
          maxLength={100}
        />
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">No tasks yet. Add one above!</div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    className="todo-edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'save', todo.id)}
                    autoFocus
                  />
                  <div className="todo-actions">
                    <button 
                      className="save-btn" 
                      onClick={() => saveEdit(todo.id)}
                    >
                      Save
                    </button>
                    <button 
                      className="cancel-btn" 
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span 
                    className={`todo-text ${todo.completed ? 'completed' : ''}`}
                    onClick={() => !todo.completed && startEdit(todo.id, todo.text)}
                  >
                    {todo.text}
                  </span>
                  <div className="todo-actions">
                    {!todo.completed && (
                      <button 
                        className="edit-btn" 
                        onClick={() => startEdit(todo.id, todo.text)}
                      >
                        Edit
                      </button>
                    )}
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;