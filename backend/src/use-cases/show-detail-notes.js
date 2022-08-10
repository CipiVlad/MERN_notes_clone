const { NotesDAO } = require('../db_access')

function showDetails({notesId}){
    return NotesDAO.findById(notesId) 
 
 }

 module.exports = {showDetails}