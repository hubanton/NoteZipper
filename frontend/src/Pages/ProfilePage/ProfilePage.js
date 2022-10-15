import React, { useEffect, useState } from "react";
import { MainScreen } from "../../Components/MainScreen";
import { Col, Row, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
export const ProfilePage = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");

  const navigate = useNavigate();

  const undoChanges = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPic(userInfo.pic);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateProfile({ name, email, password, pic }));
    }
  };

  const postDetails = (image) => {
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
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setPic(userInfo?.pic);
  }, [success, userInfo, navigate]);

  return (
    <>
      <MainScreen title="Edit Profile">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner
              animation="border"
              variant="primary"
              style={{ width: "8rem", height: "8rem" }}
            ></Spinner>
          </div>
        ) : (
          <div>
            <Row className="profileContainer">
              <Col md={6} className="mt-3">
                <Form onSubmit={handleSubmit} style={{ marginTop: "0px" }}>
                  {error && (
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                  )}
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder="Change Name..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      placeholder="Change Email..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Change Password..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Confirm new Password..."
                    />
                  </Form.Group>
                  <div className="mb-5">
                    <label htmlFor="formFile" className="form-label">
                      Change Picture
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
                  <div style={{ textAlign: "right", marginTop: "30px" }}>
                    <Button className="me-3" variant="primary" type="submit">
                      Save Changes
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={undoChanges}
                    >
                      Undo changes
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <img
                  style={{
                    height: "auto",
                    width: "60%",
                    objectFit: "contain",
                  }}
                  src={pic}
                  alt={name}
                  className="mt-5"
                />
              </Col>
            </Row>
          </div>
        )}
      </MainScreen>
    </>
  );
};
