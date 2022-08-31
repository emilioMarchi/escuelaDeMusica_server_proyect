const router = require('express').Router()

const PaymentController = require('../controllers/paymentController')
const PaymentServices = require('../services/paymentServices')

const PaymentInstance = new PaymentController(new PaymentServices())

router.get('/', (req, res)=>{
    return res.json(
        {
            'payment': 'generate payment link',
            'subscription': 'generate subscription link'
        }
    )
})

router.get('/payment', (req, res)=>{
    PaymentInstance.getPaymentLink(req,res)
})
router.get('/subscription', (req, res)=>{
    PaymentInstance.getSubscriptionLink(req,res)
})

module.exports = router