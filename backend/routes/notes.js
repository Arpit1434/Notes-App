const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator")

const router = express.Router()

// ROUTE 1: Get all notes using GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2: Add a new note using POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        // If there are errors, return bad request and the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
    
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save()
    
        res.json(savedNote)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Update an existing note using PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const {title, description, tag} = req.body
        // If there are errors, return bad request and the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        // Create a new note object
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
    
        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }
        // Allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 4: Delete an existing note using DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }
        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note: note})
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router