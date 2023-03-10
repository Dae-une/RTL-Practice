import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ScoopOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const currentValue = e.target.value;

    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid = 0 <= currentValueFloat && Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(valueIsValid);
    const newValue = valueIsValid ? parseInt(currentValue) : 0;
    updateItemCount(name, parseInt(newValue), "scoops");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`${BASE_URL}/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: "10px" }}>
        <Form.Label column xs="6" style={{ textAlign: "center" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control type="number" defaultValue={0} onChange={handleChange} isInvalid={!isValid} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
