require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors()); //husk npm i cors
app.use(express.json());
app.use(express.static('public')); 

// velkomme til serveren! GET http://localhost:3005/formulaone
app.get('/', async(req,res) => {
    res.send("Velkommen til serveren!")
});

// formulaone - router - http://localhost:3005/formulaone
const formulaoneRouter = require('./routes/formulaone');
app.use('/formulaone', formulaoneRouter)
'localhost:3005/formulaone/'


app.listen(3005, () => console.log('Server Stared'))