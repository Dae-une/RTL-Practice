import React from "react";
import { Col } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";

const ScoopOption = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`${BASE_URL}/${imagePath}`} alt={`${name} scoop`} />
    </Col>
  );
};

export default ScoopOption;
