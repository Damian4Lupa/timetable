import React from 'react';
import payment from './img/payment.png'
import security from './img/security.png'
import promotion from './img/promotion.png'

const Offer = () => {
    return (
        <section className="container marketing mt-5">

            <div className="row">
                <article className="col-lg-4 mt-5">
                    <img src={promotion} alt="" height="140" />
                    <header>
                    <h2 className="mt-2">Best price guranteed</h2>
                    </header>
                    <p className="justify">We will find the best combination for you. You will not miss a discount or promotion. You can buy regional, long-distance or even international regional trains. You will pay as much as the ticket costs - no additional fees, no commission, the best price guaranteed!</p>
                    <center><a className="btn btn-secondary blue" href="#" role="button">View details »</a></center>
                </article>
                <article className="col-lg-4 mt-5">
                    <img src={payment} alt="" height="140" />
                    <header>
                    <h2 className="mt-2">Easy to book and manage</h2>
                    </header>
                    <p className="justify">Find, book, change or cancel your tickets in an instant. The return card takes up to 15 minutes. Download our application and check travel details on a regular basis.</p>
                    <center><a className="btn btn-secondary blue" href="#" role="button">View details »</a></center>
                </article>
                <article className="col-lg-4 mt-5">
                    <img src={security} alt="" height="140" />
                    <header>
                    <h2 className="mt-2">Pay with confidence</h2>
                    </header>
                    <p className="justify">Transactions carried out through our portal are guaranteed by the National Clearing House, PayPro S.A. and SIX Payment Services. After sending an e-mail with your card, your tickets are immediately sent to your e-mail address.</p>
                    <center><a className="btn btn-secondary blue" href="#" role="button">View details »</a></center>
                </article>
            </div>
        </section>
    )
}

export default Offer