import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  const newOrderButton = <Button onClick={handleClick}>Create new Order</Button>;

  useEffect(() => {
    axios
      .post(`${BASE_URL}/order`)
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, []);

  if (isError) {
    return (
      <>
        <AlertBanner />
        {newOrderButton}
      </>
    );
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>as per our terms and conditions, nothing will happen now</p>
        {newOrderButton}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};
export default OrderConfirmation;
