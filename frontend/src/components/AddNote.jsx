import { useState, useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import DictateNote from './DictateNote';
import TextField from '@mui/material/TextField';


const AddNote = ({ show, setAllNotes }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [audioNote, setAudioNote] = useState("")

    const addNote = (e) => {
        e.preventDefault()
        console.log('saved successfully')
        fetch('http://localhost:1801/notes/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                text: audioNote,
            })
        })
            .then((response) => response.json(), window.location.reload(true))
            .then((addedNote) => setAllNotes((prevNotes) => [...prevNotes, addedNote]))
    }
    return (

        <div>
            <div style={{ display: show ? "" : "none" }}>
                {/* <input className="title-field" type="text" placeholder="add title" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="text-field" value={text} onChange={(e) => setText(e.target.value)} placeholder="add note"></textarea> */}
                <TextField
                    id="standard-multiline-flexible"
                    label="Add Title"
                    // placeholder="Add Title"

                    multiline
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="filled"
                    rows={5}

                />
                <TextField
                    id="standard-textarea"
                    label="Add Text"
                    multiline
                    variant="filled"
                    value={audioNote}
                    onChange={(e) => setAudioNote(e.target.value)}
                    rows={5}
                />
                <br />
                <Tooltip title="Save" arrow>
                    <SaveIcon onClick={addNote}
                        style={{ cursor: 'pointer' }}
                    />
                </Tooltip>
                <DictateNote audioNote={audioNote} setAudioNote={setAudioNote} />
            </div>

        </div >
    )
}

export default AddNote

