const express = require('express') 
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path')
require('dotenv').config()
const cors = require('cors');



const app = express()
const port = process.env.PORT || 8080

//
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let corsOptions = {
    origin: 'http://localhost:3000', // Reemplazar con dominio
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));


// Conexión a Base de datos

const uri = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.1mh2ak2.mongodb.net/?retryWrites=true&w=majority`;
const connectDb = async ()=>{ 
    await mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
}
connectDb()
    
//import routes
const authRoute = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard');
const verifyToken = require('./mdlw/validateToken');
    
 

// routes
app.use('/auth', authRoute)


app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
    res.send('holis')
})
// route middlewares
app.use('/api/dashboard', verifyToken, dashboardRoutes);

app.listen(port, () => console.log(`App is live on port ${port}!`))