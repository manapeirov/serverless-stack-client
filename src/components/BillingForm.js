import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

const BillingForm = ({ isLoading, onSubmit, ...props }) => {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  const validateForm = () => {
    return fields.name !== "" && fields.storage !== "" && isCardComplete;
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({
      name: fields.name,
    });

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  };

  return (
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <FormGroup bsSize="large" controlId="storage">
        <ControlLabel>Storage</ControlLabel>
        <FormControl
          min="0"
          type="number"
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder="Number of notes to store"
        />
      </FormGroup>
      <hr />
      <FormGroup bsSize="large" controlId="name">
        <ControlLabel>Cardholder&apos;s name</ControlLabel>
        <FormControl
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          placeholder="Name on the card"
        />
      </FormGroup>
      <ControlLabel>Credit Card Info</ControlLabel>
      <CardElement
        className="card-field"
        onChange={(event) => setIsCardComplete(event.complete)}
        style={{
          base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' },
        }}
      />
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </form>
  );
};
// wrap component with a Stripe module using the injectStripe HOC. This gives component access to the props.stripe.createToken method.
export default injectStripe(BillingForm);
