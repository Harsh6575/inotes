import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

    const host = "http://localhost:5000";
    const notesInitial = []; // initial state
    const [notes, setNotes] = useState(notesInitial); // state

    // getnotes

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            } // set the headers
        });
        const json = await response.json(); // parse the data into json
        setNotes(json); // set the state
    }; 

    // add note to notes array

    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }, // set the headers
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json(); // parse the data into json

        setNotes(notes.concat(note)); // set the state
    };

    // remove note from notes array

    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            } // set the headers
        });
        const json = await response.json();  // parse the data into json

        setNotes(notes.filter((note) => note._id !== id)); // set the state

    }; // deleteNote = setState

    // update note in notes array

    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        }); // fetch the data
        const json = await response.json(); // parse the data into json

        let newNote = JSON.parse(JSON.stringify(notes)); // clone the notes array

        // Logic to edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            };
        };
        setNotes(newNote); // set the state
    }; // editNote = setState

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;