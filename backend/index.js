const cors = require('cors')
const express = require('express');
const PORT = process.env.PORT || 1801
const morgan = require('morgan')
const app = express()
const { notesRouter } = require('./src/routes/notes-routes')


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use("/notes", notesRouter)


// Routes
app.get('/', (req, res) => {
    res.send('Homepage')
});


app.listen(PORT, () => console.log(`Server Started at Port ${PORT}
=> http://localhost:${PORT}`))