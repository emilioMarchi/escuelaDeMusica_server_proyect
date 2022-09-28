const router = require('express').Router()

const PaymentController = require('../controllers/paymentController')
const PaymentServices = require('../services/paymentServices')

const PaymentInstance = new PaymentController(new PaymentServices())

let data
router.get('/', (req, res)=>{
    return res.json(
        {
            'payment': 'generate payment link',
            'subscription': 'generate subscription link'
        }
    )
})

router.post('/payment', async(req, res)=>{  
    
    res.send(await PaymentInstance.getPaymentLink(req.body))
        
})

router.post('/subscription', async (req, res)=>{
    res.send(await PaymentInstance.getSubscriptionLink(req.body,res))
    
})

module.exports = router