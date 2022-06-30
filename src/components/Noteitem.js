import { React, useContext } from 'react';
import '../App.css'

import { FaTrashAlt, FaEdit } from "react-icons/fa";

import noteContext from "../Context/Notes/NoteContext";

const Noteitem = (props) => {

    const context = useContext(noteContext); // get the context
    const { deleteNote } = context; // get the functions from context

    const { note, updateNote } = props; // get the note from props
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <FaTrashAlt className='mx-2 buth' onClick={() => {
                            deleteNote(note._id); // delete the note
                            props.showAlert("Note deleted", "success"); // show the alert of delete note
                        }} />
                        <FaEdit className='mx-2 buth' onClick={() => {
                            updateNote(note); // update the note
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem;