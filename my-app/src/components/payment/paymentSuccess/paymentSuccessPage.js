import React from "react";
import { Button, Stack, ThemeProvider, Typography } from "@mui/material";
import { CssBaseline, Box } from "@mui/material";
import { Link } from "react-router-dom";
import themeOptions from "../../style/theme";
import Export from "../../invoicePdf/Invoice";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { orders } from "../../recoils/atoms";
import { getData } from "../../recoils/getterFunctions";

import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />

      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <Box
          component="img"
          sx={{ height: 80, ml: 12, mr: 12, mt: 2 }}
          alt="Your logo."
          src={"voidtureLogo.png"}
        />
      </Link>
      <Box
        sx={{
          bgcolor: themeOptions.palette.white.main,
          ml: 12,
          mr: 12,
          mb: 12,
          pb: 4,
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Box
            sx={{ width: 380 }}
            component="img"
            src="confetti.png"
            alt="success-img"
          ></Box>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Your order is complete!
          </Typography>
          <Typography variant="h6">
            You will be receiving a confirmation email with order details. You
            can download your invoice to see the order details.
          </Typography>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: themeOptions.palette.primary.light,
                display: "block",
                padding: (8, 1, 8, 1),
                mb: 2,
                justify: "center",
              }}
            >
              <Typography sx={{ color: "white" }}>
                Explore New Furnitures
              </Typography>
            </Button>
          </Link>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentSuccessPage;
