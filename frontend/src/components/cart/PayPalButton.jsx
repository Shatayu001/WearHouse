import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        // NOTE: Replace this with your actual MERCHANT client ID for production
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        // Step 1: Create the order ID on the server
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount.toFixed(2).toString(),
                  },
                },
              ],
            })
            .catch((err) => {
              console.error("CreateOrder error:", err);
              onError(err);
              throw err;
            });
        }}
        // Step 2: Approve the payment, then call the backend to CAPTURE
        onApprove={(data, actions) => {
          return fetch("/api/capture-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID,
              expectedAmount: amount,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Server failed to capture order.");
              }
              return response.json();
            })
            .then((orderData) => {
              const status = orderData.status;
              if (status === "COMPLETED") {
                onSuccess(orderData);
              } else {
                throw new Error(`Payment not COMPLETED. Status: ${status}`);
              }
            });
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
