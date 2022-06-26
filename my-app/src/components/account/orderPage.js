import ProfilePageContainer from "./profilePageContainer";
import OrderItem from "./order/orderItem";
import { Stack } from "@mui/material";
import { getData } from "../recoils/getterFunctions";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

const OrderPage = () => {
  const [orderList, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    getData(`http://164.92.208.145/api/v1/users/orders`)
      .then((res) => {
        console.log("Order response", res.data);

        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const orderWidget = isLoaded ? (
    <Stack direction="column">
      {orderList.map((order, index) => {
        return (
          <div style={{ display: "block" }}>
            <OrderItem key={index} data={order}></OrderItem>
          </div>
        );
      })}
    </Stack>
  ) : (
    <div>Loading...</div>
  );

  return (
    <ProfilePageContainer
      pageIndex={0}
      widget={orderWidget}
    ></ProfilePageContainer>
  );
};

export default OrderPage;
