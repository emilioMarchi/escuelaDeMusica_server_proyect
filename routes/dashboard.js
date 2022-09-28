const router = require('express').Router();

router.get('/', (req, res) => {
 
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})
router.get('/name?', (req, res) => {
    const name = req.params
    res.send(`hola ${name}`)
})

module.exports = router