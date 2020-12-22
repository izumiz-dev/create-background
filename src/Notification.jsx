import React from "react";
import { Alert, Collapse } from "react-bootstrap";

export const Notification = ({ message, isShow }) => {
  return (
    <div>
      <Collapse in={!isShow}>
        <Alert variant="primary">{message}</Alert>
      </Collapse>
    </div>
  );
};
