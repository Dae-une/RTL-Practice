import React, { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error("useOrderDetails must be callse from within an OrderDetailsProvider");
  }

  return contextValue;
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = (itemName, itemCount, optionType) => {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionType][itemName] = itemCount;
    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  };

  const calculateTotal = (optionType) => {
    const countArray = Object.values(optionCounts[optionType]);
    const totalCount = countArray.reduce((total, value) => total + value, 0);

    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>;
};
