import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import "./App.css";
import Routes from "./Routes";

export default function App() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        onError(error);
      }
    }
    setIsAuthenticating(false);
  };

  const handleLogout = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnselect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Mana Notes</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}
