import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import { Link } from "react-router-dom";
import React from "react";
import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { getCookie } from "../../recoils/atoms";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import DeliveryChangeDropDown from "../../admin_panel/delivery/DeliveryChangeDropDown";
const access = getCookie("access_token");
const user_type = getCookie("user_type");

export default function OrderMiniItem(props) {
  const product = props.data;
  const [orderState, setOrderStatus] = React.useState(product.order_status);
  console.log(props);
  const makeRefund = async () => {
    let headersList = {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    };
    let bodyContent = {
      reason: "deneme",
      orderitem_id: product.id,
    };
    await axios
      .post(`http://164.92.208.145/api/v1/users/orders/refund`, bodyContent, {
        headers: headersList,
      })
      .then((response) => {
        console.log("response", response);
        //props.adderHandler(response.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const acceptRefund = async () => {
    let headersList = {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    };
    let bodyContent = {
      status: true,
    };
    await axios
      .post(
        `http://164.92.208.145/api/v1/users/orders/refund/status/{id}?orderItemId=${product.id}`,
        bodyContent,
        {
          headers: headersList,
        }
      )
      .then((response) => {
        console.log("response", response);
        //props.adderHandler(response.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeStatus = async (e) => {
    let headersList = {
      Accept: "*/*",

      Authorization: `Bearer ${access}`,
    };

    let reqOptions = {
      url: `http://164.92.208.145/api/v1/users/orders/change_status?order_id=${product.id}&order_status=${e}`,
      method: "PATCH",
      headers: headersList,
    };

    axios.request(reqOptions).then(function (response) {
      console.log(response.data);
    });
    setOrderStatus(e);
  };
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <img
        src={
          product.product.photos.length != 0
            ? product.product.photos[0].photo_url
            : ""
        }
        height={64}
        alt={"Voidture not Found"}
      />
      <Typography variant="body1" color="text.primary" fontSize={10}>
        {product.product.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Quantity: {product.quantity}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Price: {product.price}
      </Typography>

      {(() => {
        //change status to order.order_status

        if (orderState === "PROCESSING") {
          return (
            <Stack direction="row" gap={1}>
              <PendingActionsTwoToneIcon
                color="primary"
                style={{ fontSize: 25 }}
              />
              {orderState}
              <div>&nbsp;</div>
            </Stack>
          );
        } else if (orderState === "In-transit") {
          return (
            <Stack direction="row" gap={1}>
              <LocalShippingTwoToneIcon
                color="primary"
                style={{ fontSize: 25 }}
              />
              {orderState}
              <div>&nbsp;</div>
            </Stack>
          );
        } else if (orderState === "Delivered") {
          return (
            <Stack direction="row" gap={1}>
              <CheckCircleOutlineTwoToneIcon
                color="primary"
                style={{ fontSize: 25 }}
              />
              {orderState}
              <div>&nbsp;</div>
            </Stack>
          );
        } else {
          return (
            <Stack direction="row" gap={1}>
              <CheckCircleOutlineTwoToneIcon
                color="primary"
                style={{ fontSize: 25 }}
              />
              {orderState}
              <div>&nbsp;</div>
            </Stack>
          );
        }
      })()}
      <Stack direction="row" gap={1}>
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          {`  ${product.price * product.quantity}`}$
        </Typography>
        <div>&nbsp;</div>
      </Stack>
      {user_type == "PRODUCT_MANAGER" ? (
        product.order_status != "REFUNDED" ? (
          <DeliveryChangeDropDown
            key={2}
            handleStatus={(e) => {
              changeStatus(e);
            }}
            defaultValue={product.order_status}
          ></DeliveryChangeDropDown>
        ) : (
          <Typography variant="h6" style={{ fontWeight: 600 }}>
            Done
          </Typography>
        )
      ) : product.order_status == "REFUNDED" ? (
        <Typography />
      ) : user_type == "SALES_MANAGER" ? (
        props.isRefund == true ? (
          <IconButton onClick={acceptRefund}>
            <DoneIcon />
          </IconButton>
        ) : (
          <Typography />
        )
      ) : (
        <Button onClick={makeRefund}>Make Refund</Button>
      )}
    </Stack>
  );
}
