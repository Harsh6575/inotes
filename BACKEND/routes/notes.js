const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');


//                            ===ROUTE 1 ===
//  get all note of user , get req ,  login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occur");
    }

});



//                            ===ROUTE 2 ===
//  add note , post req  , login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter title of length greater than 3 ').isLength({ min: 3 }),
    body('description', 'description must be 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // if there are error, return bad request and the errors  

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNotes = await notes.save();

        res.json(savedNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occur");
    }

});

//                            ===ROUTE 3 ===
//  update note , post req  , login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find notes

        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("not found") };

        // authenticate user

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: note })

        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occur");
    }
});

//                            ===ROUTE 4 ===
//  delete note , post req  , login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        // find notes

        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("not found") };

        // authenticate user

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error has been occur");
    }

});

module.exports = router