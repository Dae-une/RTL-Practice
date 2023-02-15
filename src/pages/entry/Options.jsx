import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import ToppingOption from "./ToppingOption";

const Options = ({ optionType }) => {
  const [items, setItesm] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${optionType}`)
      .then((res) => {
        setItesm(res.data);
      })
      .catch((error) => {
        // TODO: handle erroe response
      });
  }, [optionType]);

  const ItemCopmponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemCopmponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
