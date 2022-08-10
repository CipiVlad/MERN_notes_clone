const { NotesDAO } = require("../db_access");

function removeNote({noteId}){
    return NotesDAO.delteNote(noteId)
}
module.exports = {removeNote};