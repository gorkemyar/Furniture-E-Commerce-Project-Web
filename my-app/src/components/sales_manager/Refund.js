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
import SalesManagerPanel from "./SalesManager";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../recoils/atoms";
import { getData } from "../recoils/getterFunctions";
import OrderMiniItem from "../account/order/orderMiniItem";
const access = getCookie("access_token");
const Refund = (props) => {
  const [refundList, setRefundList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refundId, setRefundId] = useState(-1);
  //const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getData("http://164.92.208.145/api/v1/users/orders/refunds")
      .then((res) => {
        setRefundList(res.data);
        //console.log(res.data);
      })
      .then(() => {
        setIsLoaded(true);
      });
  }, []);

  const newCategoryWidget = (
    <Card>
      <Typography sx={{ fontSize: 20 }} pl={2}>
        Refund Requested Products
      </Typography>
      {isLoaded ? (
        <Stack direction="column">
          {refundList.map((order, index) => {
            return (
              <div style={{ display: "block" }}>
                <OrderMiniItem
                  isRefund={true}
                  key={index}
                  data={order.orderitem}
                  status={order.status}
                ></OrderMiniItem>
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
    <SalesManagerPanel
      pageIndex={2}
      widget={newCategoryWidget}
    ></SalesManagerPanel>
  );
};

export default Refund;
