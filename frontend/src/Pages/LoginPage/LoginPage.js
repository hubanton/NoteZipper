import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MainScreen } from "../../Components/MainScreen";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/notes");
    }
  }, [navigate, userInfo]);

  async function handleSubmit(event) {
    event.preventDefault();

    dispatch(login(email, password));
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
        {loading ? (
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
