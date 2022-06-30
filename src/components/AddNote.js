import React, { useContext, useState } from 'react';
import noteContext from "../Context/Notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        addNote(note.title, note.description, note.tag);
        e.preventDefault(); // prevents page reload
        props.showAlert("Note added", "success"); // show the alert of add note
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); // updates the state
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name='title' id="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;
