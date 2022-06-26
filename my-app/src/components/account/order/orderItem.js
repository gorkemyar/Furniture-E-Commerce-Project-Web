import React from "react";
import { Box, Stack, Card, CardContent, Typography } from "@mui/material";
import themeOptions from "../../style/theme";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import { Link } from "react-router-dom";
import OrderMiniItem from "./orderMiniItem";

const OrderItem = (props) => {
  const order = props.data;
  console.log("OrderItem", order);
  var totalPrice = 0;
  for (var i = 0; i < order.order_details.length; i++) {
    totalPrice +=
      order.order_details[i].price * order.order_details[i].quantity;
  }

  return (
    <Card
      sx={{
        minHeight: 100 + order.order_details.length * 100,
        display: "block",
        borderRadius: 3,
        border: 1,
        bgcolor: themeOptions.palette.white.main,
        m: 1,
      }}
    >
      <CardContent sx={{ pt: 3 }}>
        <Stack direction="column" justifyContent="center">
          <Stack direction="row" alignItems="center">
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
              ml={2}
            >
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                Your Order
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <b>Shipping Address:</b> {order.address.name} -{" "}
                {order.address.personal_name} - {order.address.phone_number}-{" "}
                {order.address.full_address} - {order.address.city} -{" "}
                {order.address.province} -{order.address.state}{" "}
                {order.address.country}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Payment information:</b> {order.credit.payment_method} -
                ****************- {order.credit.card_name}
              </Typography>
            </Stack>

            <Box flexGrow={1}></Box>

            <Box flexGrow={2}></Box>
          </Stack>

          {order.order_details.map((product, index) => {
            return (
              <OrderMiniItem
                data={product}
                isRefund={props.isRefund ?? false}
              />
            );
          })}
          <Box flexGrow={5}></Box>
          <Stack direction="row" justifyContent="end" gap={1}>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Order total: {totalPrice} $
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
