const axios = require('axios')

class PaymentService {

    async createPayment(){
        const url = 'https://api.mercadopago.com/checkout/preferences'
    
        const body = {
            player_email:'test_user_56462082@testuser.com',
            items : [
                {
                    title:'title',
                    description:'description product',
                    picture_url:'https://www.myapp.com/myimage.jpg',
                    category_id:'category',
                    quantity:1,
                    unit_price:100,
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
                'Authorization': `Bearer ${process.env.ACCES_TOKEN_MP}`
            }
        })

        return payment.data
    }

    async createSubscription() {
        const url = 'https://api.mercadopago.com/preapproval'

        const body = {
            reason:'Suscripcion de ejemplo',
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: 10,
                currency_id: 'ARS',
            },
            back_ur:'',
            player_email:'test_user_56462082@testuser.com',
        }

        const subscription = await axios.post(url, body, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.ACCES_TOKEN_MP}`
            }
        })

        return subscription.data
    }

}

module.exports = PaymentService