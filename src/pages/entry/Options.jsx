import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utils";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItesm] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${optionType}`)
      .then((res) => {
        setItesm(res.data);
      })
      .catch((error) => {
        return setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemCopmponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemCopmponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));
  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
