import React from "react"
import gif from "../img/8RDg.gif"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DictateNote from "../components/DictateNote";
import TextField from '@mui/material/TextField';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NoteDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [showEditFields, setShowEditFields] = useState(false);
    const id2 = detail._id
    console.log(id)

    const [audioNote, setAudioNote] = useState("")


    useEffect(() => {
        fetch("http://localhost:1801/notes/details/" + id)
            .then(response => response.json())
            .then(noteObj => {
                setDetail(noteObj)
                console.log(noteObj)
            }).then(() => {
                console.log(detail)
                setTitle(detail.title)
                setText(detail.text)
            })
    }, [id])

    const editNote = () => {
        let note = { id2, title, text: audioNote }
        fetch(`http://localhost:1801/notes/edit/${id2}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(note)
        })
            .then(res => res.json(), window.location.reload(false)
            )
    }

    const deletNote = () => {
        fetch(`http://localhost:1801/notes/delete/` + id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
        navigate('/')
    }

    //Dialog Window Delete
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if (detail) return (
        <div >
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Please Confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Do you really want to delete this note?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deletNote}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>

            <Tooltip title="Delete" arrow>
                <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickOpen}
                />
            </Tooltip>
            <Tooltip title="Edit" arrow>
                <ModeEditIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowEditFields((s) => !s)}
                />
            </Tooltip>

            {/* show detail */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                <h2>{detail.title}</h2>
                <p style={{ fontSize: 12 }}>{moment(detail.time).fromNow()}</p>
            </div>
            <p style={{ padding: "0 20%" }} >{detail.text}</p>

            {/* edit */}
            <div
                style={{ display: showEditFields ? "block" : "none" }}
            >
                <TextField
                    id="standard-multiline-flexible"
                    label="Edit Title"
                    // placeholder={`${detail.title}`}

                    multiline
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="filled"
                    rows={5}

                />
                <TextField
                    id="standard-textarea"
                    label="Edit Text"
                    // placeholder={`${detail.text}`}
                    multiline
                    variant="filled"
                    value={audioNote}
                    onChange={(e) => setAudioNote(e.target.value)}
                    rows={5}

                />

                {/* <input type="title"
                    name="title" id="title"
                    placeholder={`${detail.title}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="title-field"
                />

                <textarea name="text"
                    id="text" cols="30" rows="10"
                    placeholder={`${detail.text}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="text-field"
                ></textarea> */}

                {/* <img src={detail.noteImage} alt="" /> */}

                {detail.noteImage}
                <Tooltip title="Save" arrow>
                    <SaveIcon
                        onClick={editNote}
                        style={{ cursor: 'pointer' }}
                    />
                </Tooltip>
                <DictateNote audioNote={audioNote} setAudioNote={setAudioNote} />
                {/* <img src={gif} alt="" style={{ marginTop: '10vh' }} /> */}
                {console.log(gif)}
            </div>
            {/* back to AllNotes */}
            <a href="/" style={{ display: 'block' }}>
                <Tooltip title="Back" arrow>
                    <ArrowBackIcon />
                </Tooltip>
            </a>

        </div >
    )
    else return (<h1>Loading...</h1>)
}

export default NoteDetail