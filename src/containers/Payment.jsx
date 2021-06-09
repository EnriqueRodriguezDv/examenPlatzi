import React, { useContext } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useHistory } from "react-router-dom"

import AppContext from "../context/AppContext";
import "../styles/components/Payment.css";

const Payment = () => {
  const history = useHistory()
  const { state } = useContext(AppContext);
  const { cart, buyer, addNewOrder } = state;

  const paypalOptions = {
    clientId: process.env.PAYPAL_KEY,
    intent: "capture",
    currency: "EUR",
  };

  const buttonStyles = {
    layout: "vertical",
    shape: "rect",
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === "COMPLETED") {
      const newOrder = {
        buyer,
        products: cart,
        payment: data,
      };
      addNewOrder(newOrder, history.push("/checkout/success"));
    }
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Payment">
      <div className="payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item, index) => (
          <div className="Payment-item" key={item.title + index}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: handleSumTotal(),
                    },
                  },
                ],
              });
            }}
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onStart={() => console.log("Start Payment")}
            onSuccess={(data) => handlePaymentSuccess(data)}
            onError={(err) => console.log(err)}
            onCancel={(data) => console.log(data)}
          />
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Payment;
