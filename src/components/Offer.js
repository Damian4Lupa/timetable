import React from 'react';
import payment from './img/payment.png'
import security from './img/security.png'
import promotion from './img/promotion.png'

const Offer = () => {
    return (
        <div className="container marketing marginTop">


            <div className="row">
                <div className="col-lg-4">
                    <img src={promotion} alt="" height="140" />

                    <h2 className="mt-2">Best price guranteed</h2>
                    <p className="justify">We will find the best combination for you. You will not miss a discount or promotion. You can buy regional, long-distance or even international regional trains. You will pay as much as the ticket costs - no additional fees, no commission, the best price guaranteed!</p>
                    <center><a className="btn btn-secondary blue" href="#" role="button">View details »</a></center>
                </div>
                <div className="col-lg-4">
                    <img src={payment} alt="" height="140" />
                    <h2 className="mt-2">Easy to book and manage</h2>
                    <p className="justify">Find, book, change or cancel your tickets in an instant. The return card takes up to 15 minutes. Download our application and check travel details on a regular basis.</p>
                    <center><a className="btn btn-secondary blue" href="#" role="button">View details »</a></center>
                </div>
                <div className="col-lg-4">
                    <img src={security} alt="" height="140" />
                    <h2 className="mt-2">Pay with confidence</h2>
                    <p className="justify">Transactions carried out through our portal are guaranteed by the National Clearing House, PayPro S.A. and SIX Payment Services. After sending an e-mail with your card, your tickets are immediately sent to your e-mail address.</p>

                    <center><a className="btn btn-secondary blue" href="#" role="button">View details »</a></center>

                </div>
            </div>
        </div>


    )
}

export default Offer