const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

const notesCollectionName = "Notes_Collection"

async function findAll() {
    const db = await getDB()
    const notes = await db.collection(notesCollectionName).find().toArray() // toArray() returned auch eine promise, daher await
    return notes
}

async function findById(id) {
    const db = await getDB()
    const foundNotes = await db.collection(notesCollectionName).findOne({ _id: ObjectId(id) }) // findOne() returned auch eine promise, daher await
    return foundNotes
}

async function insertOne(notesInfo) {
    const db = await getDB()
    // wir können das direkt returnen auch (muss nicht wie oben alles extra benannt werden)
    return db.collection(notesCollectionName).insertOne(notesInfo) // insertOne() returned auch eine promise, daher await
}

async function delteNote(noteId) {
    const db = await getDB();
    const removeNote = db.collection(notesCollectionName).findOneAndDelete({ _id: ObjectId(noteId) })
    return removeNote
}

async function editNote(noteId, newTextValue) {
    const db = await getDB()
    const updateNote = db.collection(notesCollectionName).findOneAndUpdate(
        { _id: ObjectId(noteId) },
        { $set: { text: newTextValue.text, title: newTextValue.title} },
        { returnDocument: "after" }
    )

    return updateNote
}


module.exports = {
    findAll,
    findById,
    insertOne,
    delteNote,
    editNote
}