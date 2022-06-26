import React from "react";
import { Button, Stack, ThemeProvider, Typography } from "@mui/material";
import { CssBaseline, Box } from "@mui/material";
import { Link } from "react-router-dom";
import themeOptions from "../style/theme";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
const PreventerPage = () => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(() => navigate("/Export"), [navigate]);

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
            src="preventerPageImage.jpeg"
            alt="success-img"
          ></Box>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Your cannot access this page without authentication!
          </Typography>
          <Typography variant="h6">Please return to main page.</Typography>

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
              <Typography sx={{ color: "white" }}>Main Page</Typography>
            </Button>
          </Link>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default PreventerPage;
