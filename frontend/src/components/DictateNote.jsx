import React from 'react'
import { useState, useEffect } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import Button from '@mui/material/Button';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en -US'

function DictateNote({ audioNote, setAudioNote }) {
    const [isListening, setIsListening] = useState(false)
    const [savedNote, setSavedNote] = useState([])

    useEffect(() => {
        handleListen()
    }, [isListening])

    const handleListen = () => {
        if (isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue...')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log('Stopped Mic on Click...')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }
        mic.onresult = event => {
            const transcript = Array.from((event.results)).map(result => result[0]).map(result => result.transcript).join('')
            console.log(transcript)
            setAudioNote(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    const handleSaveNote = () => {
        setSavedNote([...savedNote, audioNote])
        setAudioNote('')
    }

    return (
        <div style={{ marginTop: '5%', border: '2px dotted green', width: '50%', padding: '5%', marginLeft: '20%' }}>
            {isListening ? <span>recording ...</span> : <span></span>}
            <Button variant="contained" color="success" onClick={handleSaveNote} disabled={!audioNote}>Save</Button>
            <div onClick={() => setIsListening(previousState => !previousState)}>
                <StopIcon style={{ cursor: 'pointer' }} />
                <FiberManualRecordIcon style={{ cursor: 'pointer' }} />
            </div>
            <p>{audioNote}</p>
            <div>
                {savedNote.map(n => (
                    <p key={n}>{n}</p>
                ))}
            </div>
        </div>
    )
}

class Audio {
    constructor(audioNote) {
        this.audioNote = audioNote
        return this
    }

}

export default DictateNote