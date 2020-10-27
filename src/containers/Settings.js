import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Elements, StripeProvider } from "react-stripe-elements";
import config from "../config";
import BillingForm from "../components/BillingForm";
import "./Settings.css";

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    //  loads the Stripe object from Stripe.js with the Stripe key when page loads and save to state
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  const billUser = (details) => {
    return API.post("notes", "/billing", {
      body: details,
    });
  };

  const handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({ storage, source: token.id });

      alert("Your card has been charged successfully");
      history.push("/");
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="Settings">
      {/*The StripeProvider component let’s the Stripe SDK know that we want to*/}
      {/*call the Stripe methods using our Stripe key.*/}
      <StripeProvider stripe={stripe}>
        {/* Elements component needs to wrap around any component that is going*/}
        {/*to be using the CardElement Stripe component.*/}
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  );
}
