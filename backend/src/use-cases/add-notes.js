const { NotesDAO } = require("../db_access");


function addNotes(note){
return NotesDAO.insertOne(note)
}

module.exports = {addNotes};