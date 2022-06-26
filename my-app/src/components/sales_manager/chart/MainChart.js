import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Card, Typography, Stack, TextField, Button, Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Chart from "./Chart";
import Deposits from "./Deposits";
import { useRef } from "react";
import SalesManagerPanel from "../SalesManager";
import { useState, useEffect } from "react";
import { getData } from "../../recoils/getterFunctions";

const mdTheme = createTheme();

const MainChart = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  const startRef = useRef("");
  const endRef = useRef("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateValid, setIsDateValid] = useState(false);
  const addNewCategory = async (event) => {
    setStartDate(startRef.current.value);
    setEndDate(endRef.current.value);

    if (startDate !== "" && endDate !== "") {
      console.log("date start", startDate, "date end", endDate);
      setIsDateValid(!isDateValid);
    }
  };

  const [orderList, setData] = useState([]);
  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      getData(
        `http://164.92.208.145/api/v1/users/all_orders?start=${startDate}&end=${endDate}&skip=0&limit=100`
      )
        .then((res) => {
          console.log("Order response", res.data);
          const chartData = [];
          res.data.map((e) => {
            let createdAt = e.created_at.toString();
            createdAt = createdAt.substring(0, 10);
            let price = 0;
            e.order_details.map((d) => {
              price += d.price * d.quantity;
            });
            console.log(price);
            chartData.push({ createdAt: createdAt, price: price });
          });

          setData(chartData);
          setIsLoaded(true);
          //console.log(chartData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isDateValid]);

  const chartWidget = (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[500],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={addNewCategory}
            noValidate
          >
            <Stack direction="row" justifyContent="space-between" sx={{ m: 2 }}>
              <TextField
                required
                id="dateStart"
                label="Start Date"
                type="date"
                inputRef={startRef}
                defaultValue="2022-06-23"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id="dateEnd"
                label="End Date"
                type="date"
                inputRef={endRef}
                defaultValue="2022-06-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ m: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ff6600",
                  display: "block",
                  padding: (8, 1, 8, 1),
                  justify: "flex-end",
                  align: "right",
                }}
              >
                Select Date
              </Button>
            </Stack>
          </Box>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                }}
              >
                <Chart data={orderList} />
              </Paper>
            </Grid>
            <Grid
              sx={{ marginTop: 5, mt: 4, mb: 4 }}
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "10vh" }}
            >
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 180,
                }}
              >
                {isLoaded && (
                  <Deposits data={orderList[orderList.length - 1]} />
                )}
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
  return (
    <SalesManagerPanel pageIndex={1} widget={chartWidget}></SalesManagerPanel>
  );
};

export default MainChart;
