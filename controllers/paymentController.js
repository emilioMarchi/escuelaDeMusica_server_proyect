class PaymentController {
    constructor(subscriptionService){
        this.subscriptionService = subscriptionService
    }

    async getPaymentLink(req,res){
        try{
            const payment = await this.subscriptionService.createPayment(req)
            return payment
        }
        catch(error){
            return{error: true, msj:'error payment'}
        }
    }

    async getSubscriptionLink(req, res) {
        try {
          const subscription = await this.subscriptionService.createSubscription(req);
    
          return subscription
        } catch (error) {
          console.log(error);
    
          return { error: true, msg: "Failed to create subscription" };
        }
      }
}

module.exports=PaymentController