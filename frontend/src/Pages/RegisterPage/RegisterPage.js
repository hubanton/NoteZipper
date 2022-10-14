import React, { useState } from "react";
import "./RegisterPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MainScreen } from "../../Components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import { register } from "../../actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [img, setImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/notes");
    }
  }, [navigate, userInfo]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
    } else {
      dispatch(register(password, email, name, img));
    }
  }

  const postDetails = (image) => {
    console.log(image);
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dobglhrwe");
      fetch("https://api.cloudinary.com/v1_1/dobglhrwe/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImg(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <MainScreen title="Register">
      {errorMessage && (
        <ErrorMessage variant="danger">{errorMessage}</ErrorMessage>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            value={name}
            required
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
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
        <Form.Group className="mb-3" controlId="formPassword">
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
        <Form.Group className="mb-3" controlId="formPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            type="password"
            value={passwordConfirm}
            placeholder="Confirm Password"
          />
        </Form.Group>
        <div className="mb-5">
          <label htmlFor="formFile" className="form-label">
            Upload Picture
          </label>
          <input
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
            className="form-control"
            type="file"
            id="formImage"
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <Button variant="primary" type="submit">
            Register
          </Button>
        )}
        <div className="mt-2">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </Form>
    </MainScreen>
  );
};
