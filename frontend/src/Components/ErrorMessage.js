import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "danger", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: "16px" }}>
      {children}
    </Alert>
  );
};

export default ErrorMessage;
