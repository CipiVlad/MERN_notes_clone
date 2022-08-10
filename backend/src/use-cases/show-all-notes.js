const { NotesDAO } = require("../db_access");

async function showAllNotes() {
    const notesArray = await NotesDAO.findAll()
    return notesArray.map(notes => ({
        _id: notes._id,
        title: notes.title,
        text: notes.text,
        time: notes.time, 
        noteImage:notes.noteImage
    }))
}

module.exports = {
    showAllNotes
}