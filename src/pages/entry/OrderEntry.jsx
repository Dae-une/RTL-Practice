import React from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import Options from "./Options";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  const isDisabled = totals.scoops === 0;
  return (
    <>
      <div>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
        <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
        <Button onClick={() => setOrderPhase("review")} disabled={isDisabled}>
          Order Sundae!
        </Button>
      </div>
    </>
  );
};

export default OrderEntry;
