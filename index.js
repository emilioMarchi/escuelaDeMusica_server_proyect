const express = require('express') 
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path')
require('dotenv').config()
const cors = require('cors');


const app = express()
const port = process.env.PORT || 8080
const root = path.join(__dirname, 'build')
app.use(express.static(root))


//
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let corsOptions = {
    origin: ['http://www.escuelademusicabarrial.ar','http://escuelademusicabarrial.ar','http://localhost:3000','http://3.83.189.41','http://ec2-3-83-189-41.compute-1.amazonaws.com'], // Reemplazar con dominio
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));


// Conexión a Base de datos


    
//import routes
const authRoute = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard');
const verifyToken = require('./mdlw/validateToken');
const paymentRoute = require('./routes/payment')
const formRoute = require('./routes/formContact')
    
 

// routes
app.use('/auth', authRoute)

app.use('/api/dashboard', verifyToken, dashboardRoutes);

app.use('/', paymentRoute )

app.use('/', formRoute )
// route middlewares

app.listen(port, () => console.log(`App is live on port ${port}!`))