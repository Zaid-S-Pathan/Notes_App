import { useState, useEffect } from "react";
import api from "../api";
import Header from "../components/Header";
import Toast from "../components/Toast";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [toast, setToast] = useState({ message: "", type: "info" });

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) setToast({ message: "Note deleted", type: "success" });
                else setToast({ message: "Failed to delete note", type: "error" });
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) setToast({ message: "Note created", type: "success" });
                else setToast({ message: "Failed to make note", type: "error" });
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Header />
            <div className="page-grid panels-grid">
            <div className="panel left-panel">
                <div className="notes-section">
                    <div className="notes-section-header">
                        <h2>Your Notes ({notes.length})</h2>
                        <button className="refresh-button" type="button" onClick={getNotes}>🔄 Refresh</button>
                    </div>
                    {notes.length === 0 && (
                        <p style={{ color: "#adb5bd" }}>You have no notes yet. Create your first note below.</p>
                    )}
                    <div className="notes-grid">
                        {notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="panel right-panel">
                <h2>✨ Create New Note</h2>
                <form onSubmit={createNote} className="create-form">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter note title..."
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Write your note content here..."
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button type="submit" className="primary-btn">Create Note</button>
                </form>
            </div>
            </div>
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
        </div>
    );
}

export default Home;
