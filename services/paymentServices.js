const axios = require('axios')

class PaymentService {

    async createPayment(data){
        const url = 'https://api.mercadopago.com/checkout/preferences'
        const {name, email, amount} = data
        console.log(email)
     
        const body = {
            payer:{name, email:`${email}`},
            items : [
                {
                    title:'Donación de pago único',
                    picture_url:'https://www.myapp.com/myimage.jpg',
                    category_id:'category',
                    quantity:1,
                    unit_price:amount,
                }   
            ],
            back_urls: {
                success:'/success',
                failure:'/failure',
                pending:'/pending',
            },
            notification_url:''
        }
        const payment = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`
            }
        })

        return payment.data
    }

    async createSubscription(data) {
        const url = "https://api.mercadopago.com/preapproval";
        
        const {name, email, amount} = data

        const body = {
            reason: "Suscripcion mensual",
            payer_email: email,
            auto_recurring: {
              frequency: 1,
              frequency_type: "months",
             
              transaction_amount: amount,
              currency_id: "ARS"
            },
            back_url: "https://www.mercadopago.com.ar"
      
        };
    
        const subscription = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`
          }
        });
    
        return subscription.data;
      }

}

module.exports = PaymentService