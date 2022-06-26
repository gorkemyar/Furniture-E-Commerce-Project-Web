import * as React from "react";
import Link from "@mui/material/Link";
import {
  Card,
  Button,
  Typography,
  Stack,
  Grid,
  Rating,
  Box,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../recoils/atoms";
import { getData } from "../../recoils/getterFunctions";
import OrderItem from "../../account/order/orderItem";
import AdminPanelContainer from "../AdminPanel";
const access = getCookie("access_token");
const Delivery = (props) => {
  const [orderList, setorderList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderId, setorderId] = useState(-1);
  //const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getData(
      "http://164.92.208.145/api/v1/users/all_orders?start=2022-01-01&end=2022-06-25&skip=0&limit=100"
    )
      .then((res) => {
        setorderList(res.data);
        console.log(res.data);
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, []);

  const Delivery = (
    <Card>
      {isLoaded ? (
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
      )}
    </Card>
  );

  return (
    <AdminPanelContainer pageIndex={4} widget={Delivery}></AdminPanelContainer>
  );
};

export default Delivery;
