import React, { useState } from "react";
import "./LoginPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MainScreen } from "../../Components/MainScreen";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setIsLoading(true);

      console.log(password);
      console.log(email);
      const { data } = await axios.post(
        "/api/users/login",
        {
          email: email,
          password: password,
        },
        config
      );
      localStorage.setItem("User Info", JSON.stringify(data));
      console.log("Login Successful");
      setError(false);
    } catch (err) {
      console.log(`Login failed ${err}`);
      setError(err.response.data.message);
    }
    setIsLoading(false);
  }

  return (
    <MainScreen title="Login">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
            placeholder="Password"
          />
        </Form.Group>
        {isLoading ? (
          <Loading />
        ) : (
          <Button variant="primary" type="submit">
            Log In
          </Button>
        )}
        <div className="mt-2">
          New user? <Link to="/register">Register here</Link>
        </div>
      </Form>
    </MainScreen>
  );
};
