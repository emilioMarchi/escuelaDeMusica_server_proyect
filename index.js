const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()



const app = express()
const port = process.env.PORT || 8080 

//
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos

const uri = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.1mh2ak2.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))
    
    
    
    //import routes
    const authRoute = require('./routes/auth')
    const dashboadRoutes = require('./routes/dashboard');
    const verifyToken = require('./mdlw/validateToken');
    
    app.get('/', (req, res) => {
        res.json({
            estado: true,
            mensaje: 'funciona!'
        })
    });

    // routes
    app.use('/auth', authRoute)
    
    // route middlewares
    app.use('/api/dashboard', verifyToken, dashboadRoutes);
    
    


app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`App is live on port ${port}!`))