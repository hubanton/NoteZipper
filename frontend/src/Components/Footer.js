import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer
      className="bg-dark"
      style={{
        width: "100%",
        display: "flex",
        position: "relative",
        bottom: 0,
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; NoteZipper</Col>
        </Row>
      </Container>
    </footer>
  );
};
