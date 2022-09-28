const mongoose = require('mongoose')

const uri = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.1mh2ak2.mongodb.net/?retryWrites=true&w=majority`;
const connectDb = async ()=>{ 
    await mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))
}

module.exports=connectDb