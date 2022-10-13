import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./LandingPage.css";
import paperNotes from "../../paper-notes.png";
const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <p className="title">Welcome to the NoteZipper App!</p>
        <p className="subtitle">
          Your trustworthy place for storing all your notes
        </p>
        <img src={paperNotes} className="paperImg" alt="paperNotes"></img>
        <div className="buttonContainer">
          <Link to={"/login"}>
            <Button className="landingButton" variant="info" size="lg">
              Log In
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button className="landingButton" variant="secondary" size="lg">
              Register
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
