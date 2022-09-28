const router = require('express').Router()
const connectDb = require('../mongoConection')
const UserQuery = require('../monogoModels/usersQuery')
router.get('/form', (req,res) => {
    res.send('form')
})

router.post('/contact', async (req,res) => {
    try{
        
        await connectDb()
        const {userName, userEmail, userQuery} = req.body
        const newQuery = new UserQuery({
            userName,
            userEmail,
            userQuery,
            queryDate: new Date()
        })
        await UserQuery.create(newQuery)
   
        res.json({state:'staisfactory', msj:'Su consulta fue enviada con éxito'})
    }
    catch{
        console.log('error')
        res.json({state:'negative', msj:'Hubo un error, vuelva a intentarlo'})
    }
})

module.exports=router