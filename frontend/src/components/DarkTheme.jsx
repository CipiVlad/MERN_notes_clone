import { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import AllNotes from '../pages/AllNotes'
const DarkTheme = () => {

    const [dark, setDark] = useState(false)
    const theme = createTheme({
        palette: {
            type: dark ? 'dark' : 'light',
        },
    })
    return (
        <ThemeProvider theme={theme}>
            <Switch checked={dark} onChange={() => setDark(!dark)} />
            <Paper>
                <Typography variant='h1'>This is dark</Typography>
                <AllNotes />
                <Typography variant='body2'>This is dark body</Typography>
            </Paper>
        </ThemeProvider>
    )
}

export default DarkTheme