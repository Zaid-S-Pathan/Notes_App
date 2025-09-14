import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <div className="note-header">
                <p className="note-title">{note.title}</p>
                <div className="note-actions">
                    <button className="icon-button" title="Delete" onClick={() => onDelete(note.id)}>🗑️</button>
                </div>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
                <span className="note-date">{formattedDate}</span>
            </div>
        </div>
    );
}

export default Note
