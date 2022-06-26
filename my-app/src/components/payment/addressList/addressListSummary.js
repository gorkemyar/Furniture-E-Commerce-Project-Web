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
import { addressId } from "../../recoils/atoms";
import { getCookie } from "../../recoils/atoms";
export default function AddressListSummary(props) {
  let tCost = Number(getCookie("totalCost"));
  let discountTotal = Number(getCookie("discount"));
  const [addressId2, setAddressId] = useRecoilState(addressId);

  setAddressId(props.addressId);
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
                {tCost + discountTotal}$
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
                {tCost}$
              </Typography>
            </Stack>
          </Card>
          <Stack justifyContent="center" alignItems="center">
            <Link
              to={props.link}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Button
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
            </Link>
          </Stack>
        </Box>
      </Paper>
    </div>
  );
}
