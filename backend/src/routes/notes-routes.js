const express = require('express')
const { showAllNotes } = require('../use-cases/show-all-notes')
const { addNotes } = require('../use-cases/add-notes')
const { removeNote } = require('../use-cases/delete-note')
const { showDetails } = require('../use-cases/show-detail-notes')
const { editNote } = require('../use-cases/edit-note')
const notesRouter = express.Router()

const multer = require('multer')
const storage =multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+ file.originalname)
    }
})
const upload = multer({storage:storage})

notesRouter.get("/all", (_, res) => {
    showAllNotes()
        .then(todos => res.json(todos))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Failed to load todos from database." }) // internal server error
        })
})

notesRouter.post("/add",upload.single('noteImage'), (req, res) => {

    if (!req.body) {
        res.status(400).json({ error: "Please include a note." }) // 400 ==> Bad request
        return;
    }
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        time: Date.now(),
        // noteImage: req.file.filename
    }

    addNotes(newNote)
        .then(addedNote => res.status(201).json(addedNote)) // 201 => Created
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Failed to add note to database." })
        })
})


notesRouter.get('/details/:id', (req, res) => {

    const notesId = req.params.id;
    console.log(notesId)

    showDetails({ notesId })
        .then((details) => res.json(details))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Failed to show details" })
        })

})



notesRouter.delete('/delete/:id', (req, res) => {
    const noteId = req.params.id;
    removeNote({ noteId })
        .then(removeNote => res.json({ removeNote }))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Failed to remove note." })
        })
})

notesRouter.put("/edit/:id", (req, res) => {
    const noteId = req.params.id
    const newTextValue = {
        text: req.body.text,
        title: req.body.title
    }

    editNote({ noteId, doneValue: newTextValue })
        .then(updatedNote => res.json(updatedNote))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Failed to update note." })
        })
})

module.exports = {
    notesRouter
}
