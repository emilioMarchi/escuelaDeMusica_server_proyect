const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const authRoute = require('./routes/auth')

const app = express()
const port = process.env.PORT || 8080 

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos

const uri = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.1mh2ak2.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
app.use('/admin', authRoute)



// route middlewares
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});



app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`App is live on port ${port}!`))