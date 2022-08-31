class PaymentController {
    constructor(subscriptionService){
        this.subscriptionService = subscriptionService
    }

    async getPaymentLink(req,res){
        try{
            const payment = await this.subscriptionService.createPayment()
            return res.json(payment)
        }
        catch(error){
            res.status(500).json({error: true, msj:'error payment'})
        }
    }

    async getSubscriptionLink(req,res){
        try{
            const subscription = await this.subscriptionService.createSubscription()
            return res.json(subscription)
        }
        catch(error){
            res.status(500).json({error: true, msj:'error subscription'})
        }
    }
}

module.exports=PaymentController