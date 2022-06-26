import * as React from "react";
import {
  Typography,
  Box,
  Divider,
  Card,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { creditCardId } from "../../recoils/atoms";
import { getCookie } from "../../recoils/atoms";
import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
const access = getCookie("access_token");
export default function PaymentSummary(props) {
  let totalCost1 = Number(getCookie("totalCost"));
  const creditId = useRecoilValue(creditCardId);
  let discountTotal = Number(getCookie("discount"));
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate(`/payment-success`),
    [navigate]
  );

  const handleClick = () => {
    const addressId = Number(getCookie("addressId"));
    if (addressId && creditId) {
      console.log("asdasd", creditId, addressId);

      let bodyContent = JSON.stringify({
        address_id: addressId,
        credit_id: creditId,
      });
      axios
        .post(
          "http://164.92.208.145/api/v1/users/shopping_cart/order",
          bodyContent,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          handleOnClick();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please check Your Credit Card and Address Selection");
    }
  };

  return (
    <div>
      <Paper sx={{}}>
        <Box
          sx={{
            backgroundColor: "black",
            overflow: "auto",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#EAECEC",
              borderRadius: 0,
              width: 250,
              p: 1,
            }}
          >
            <Typography
              align="center"
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: 20 }}
            >
              Order Summary
            </Typography>
          </Card>
          <Card elevation={0} sx={{ padding: (2, 2, 2, 2), borderRadius: 0 }}>
            <Stack direction="row">
              <Typography
                align="left"
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: 16 }}
              >
                Total Product
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography
                align="right"
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
                sx={{ fontSize: 16 }}
              >
                {totalCost1 + discountTotal}$
              </Typography>
            </Stack>
            <Box sx={{ m: 1 }} />
            <Stack direction="row">
              <Typography
                align="left"
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: 16 }}
              >
                Discount Total
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography
                align="right"
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
                sx={{ fontSize: 16 }}
              >
                -{discountTotal}$
              </Typography>
            </Stack>
            <Divider />
            <Box sx={{ m: 1 }} />
            <Stack direction="row">
              <Typography
                align="left"
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: 16 }}
              >
                Total
              </Typography>
              <Box sx={{ m: 2 }} />
              <Typography
                align="right"
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
                sx={{ fontSize: 16 }}
              >
                {totalCost1}$
              </Typography>
            </Stack>
          </Card>
          <Stack justifyContent="center" alignItems="center">
            <Button
              onClick={handleClick}
              variant="contained"
              sx={{
                backgroundColor: "#ff6600",
                display: "block",
                padding: (8, 1, 8, 1),
                mb: 2,
                justify: "center",
              }}
            >
              <Typography sx={{ color: "black" }}>
                {props.buttonText}
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Paper>
    </div>
  );
}
