import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

const Options = ({ optionType }) => {
  const [items, setItesm] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${optionType}`)
      .then((res) => {
        setItesm(res.data);
      })
      .catch((error) => {
        // TODO: handle erroe response
      });
  }, [optionType]);

  // TODO : replace 'null' with ToppingComponent
  const ItemCopmponent = optionType === "scoops" ? ScoopOption : null;

  const optionItems = items.map((item) => (
    <ItemCopmponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
