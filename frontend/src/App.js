import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllNotes from './pages/AllNotes.jsx'
import NoteDetail from './pages/NoteDetail.jsx'
import './App.css';
import { createContext, useState } from 'react'
import ReactSwitch from 'react-switch'
import AddNote from './components/AddNote.jsx';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';

export const ThemeContext = createContext(null)

function App() {

const [show, setShow] = useState(false);
const[theme,setTheme] = useState('dark');

const toggleTheme = ()=>{
  setTheme((curr)=>(curr === 'dark' ? 'light':'dark'))
}

  return (
    <div className="App" id={theme}>
        <ThemeContext.Provider value={{theme,toggleTheme}}>
      <div className="d-flex-nav-icons">
        <div className="add">
            <Tooltip title="Add" arrow>
            <PostAddIcon
              onClick={() => setShow((s) => !s)}
              style={{ cursor: 'pointer' }}
              />
            </Tooltip>
      </div>
          {/* <div className="upload_send">
            <Tooltip title="Send" arrow>
              <SendIcon
              style={{ cursor: 'pointer' }}
              />
              </Tooltip>
          </div> */}
  <div className="toggle">
              <ReactSwitch
              onChange={toggleTheme}
              checked={theme === 'light'}
              checkedIcon
              uncheckedIcon
              onHandleColor='#e1c01b'
              offHandleColor="#444"
              offColor='#fff'
              onColor='#444'
              activeBoxShadow = '0 0 20px 10px #fff'
              />
  </div>
      </div> 
        <AddNote show={show} arrow />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AllNotes />} />
              <Route path="/details/:id" element={<NoteDetail />} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
    </div>
  );
}

export default App;
