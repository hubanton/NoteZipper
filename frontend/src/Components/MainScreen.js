import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";
export const MainScreen = ({ title, children }) => {
  return (
    <div className="noteLayout">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="noteTitle">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};
