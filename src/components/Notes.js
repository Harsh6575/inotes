import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../Context/Notes/NoteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {

    let navigate = useNavigate();

    const { showAlert } = props;

    const context = useContext(noteContext); // get the context
    const { notes, getNotes, editNote } = context; // get the functions from context

    const ref = useRef(null); // ref to the notes list
    const refClose = useRef(null); // ref to the close button

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" }); // state to edit note

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes(); // get the notes
    } else {
        navigate("/login")
    }
        
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click(); // open the form
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag }); // set the note to edit
    }; // update the note to edit 

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag); // edit the note
        refClose.current.click(); // close the form
        props.showAlert("Note updated", "success"); // show the alert of update note
    }; // edit the note and close the form

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); // updates the state
    }; // updates the state

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" name='etitle' id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} disabled={note.etitle.length < 3 || note.edescription.length < 5} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>You Notes</h2>
                <div className='container mx-3'>
                    {notes.length === 0 && 'No Notes To Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    );
};

export default Notes;