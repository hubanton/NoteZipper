import React from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
function Loading({ size = 40 }) {
  return (
    <>
      <Button variant="primary" disabled>
        <Spinner
          className="me-1"
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
        Loading...
      </Button>
    </>
  );
}

export default Loading;
