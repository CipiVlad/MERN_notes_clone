import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

const AllNotes = () => {
    const [allNotes, setAllNotes] = useState([])
    const [search, setSearch] = useState([])

    useEffect(() => {
        fetch('http://localhost:1801/notes/all')
            .then((response) => response.json())
            .then((json) => {
                setAllNotes(json)
                return json
            })
            .then(json => {
                setSearch(json)
            }
            )
    }, [])

    //searchBar
    const handleSubmit = (e) => e.preventDefault()
    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearch(allNotes)
        const resultArray =
            allNotes.filter(note => note.title.includes(e.target.value) || note.text.toLowerCase().includes(e.target.value) || note.title.toLowerCase().includes(e.target.value) || note.text.includes(e.target.value))

        setSearch(resultArray)
        console.log(resultArray)
    }

    return (
        <div onSubmit={handleSubmit}>
            <div style={{ margin: '2%' }}
            >
                <ThemeProvider theme={theme}>
                    <InputBase
                        placeholder="search"
                        onChange={handleSearchChange}
                        className="searchField"
                    />
                </ThemeProvider>
                <SearchIcon styles={{ cursor: 'pointer' }} color="green" />
            </div>
            <div styles={search ? 'block' : 'none'} className="allNotes_parent_container">
                <div>
                    {
                        search.map((word, i) => (
                            <Link to={`/details/${word._id}`} key={i}>
                                <h2 className="title">{word.title}</h2>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AllNotes

{
    // allNotes.map((note, i) =>
    //     <div key={i}>
    //         <Link to={`/details/${note._id}`}>
    //             <h2 className="title">{note.title}</h2>
    //         </Link>
    //     </div>
    // )
    // .filter((item) => item.title)
    /*
    --> wenn filter auf map, funktioniert Verlinkung 
    auf Detailseite nicht! 
    Vermutung: 2x map ist einmal zuviel -_- (Line 46 und 50)
    */
}