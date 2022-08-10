const { NotesDAO } = require("../db_access");

function editNote({ noteId, doneValue }) {
    return NotesDAO.editNote(noteId, doneValue)
}

module.exports = {
    editNote
}