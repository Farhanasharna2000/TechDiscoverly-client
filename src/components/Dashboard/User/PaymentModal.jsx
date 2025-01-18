/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './CSS/pay.css';
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PaymentModal = ({ closeModal, refetch, userData, payment }) => {
  const axiosSecure = UseAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount: payment,
        email: userData?.email,
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error("Error creating payment intent:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    try {
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.error("[PaymentMethod Error]", error);
        toast.error("Payment method creation failed!");
        return;
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userData?.name,
            email: userData?.email,
          },
        },
      });

      if (confirmError) {
        console.error("[Payment Confirmation Error]", confirmError);
        toast.error("Payment confirmation failed!");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Notify server to update subscription
        await axiosSecure.post('/update-subscription', { email: userData?.email });

        toast.success("Payment successful! Subscription updated.");
        refetch();
        closeModal();
      } else {
        toast.error("Payment was not successful.");
      }
    } catch (err) {
      console.error("Error during payment processing:", err);
      toast.error("An error occurred during the payment process.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Subscribe for $500</h2>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white hover:scale-105 transition-transform"
            type="submit"
            disabled={!stripe}
          >
            Pay ${payment}
          </button>
          <button
            onClick={closeModal}
            className="mt-4 ml-3 btn-outline text-[#8D0B41] btn"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
