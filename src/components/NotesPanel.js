import React from 'react';

const NotesPanel = ({ notes, setNotes }) => {
  const addNote = () => {
    const note = {
      id: Date.now(),
      content: '',
      createdAt: new Date().toISOString()
    };

    setNotes(prev => [note, ...prev]);
  };

  const updateNote = (id, content) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div className="notes-section">
      <h3>Quick Notes</h3>
      
      <button className="add-note-btn" onClick={addNote}>
        + New Note
      </button>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state">No notes yet!</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-item">
              <button 
                className="note-delete" 
                onClick={() => deleteNote(note.id)}
              >
                ×
              </button>
              <textarea
                className="note-content"
                placeholder="Write your note here..."
                value={note.content}
                onChange={(e) => updateNote(note.id, e.target.value)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPanel;