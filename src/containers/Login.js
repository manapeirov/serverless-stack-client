import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import "./Login.css";
import { useFormFields } from "../libs/hooksLib";

export default function Login() {
  const { setIsAuthenticated } = useAppContext();
  // useAppContext returns the object we passed to AppContext.Provider
  // const setIsAuthenticated = useAppContext().setIsAuthenticated
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      setIsAuthenticated(true);
    } catch (error) {
      onError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}
