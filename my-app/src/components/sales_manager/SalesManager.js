import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  Grid,
  Stack,
} from "@mui/material";
import PrimarySearchAppBar from "../header/AppBar";
import ResponsiveAppBar from "../header/AppBarUnder";
import Footer from "../footer/Footer";
import themeOptions from "../style/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material/";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { getCookie } from "../recoils/atoms";
import PreventerPage from "../admin_panel/PreventerPage";
const user_type = getCookie("user_type");
const SalesManagerPanel = (props) => {
  const pageIndex = props.pageIndex;

  const navigate = useNavigate();

  const columnItems = [
    ["View Invoices", "../view_invoice_sales_manager"],
    ["Calculate Loss/Profit", "../chart"],
    ["Refund Request", "../refund"],
  ];

  const handleOnClickList = columnItems.map((item) => {
    return () => {
      navigate(item[1]);
    };
  });

  return (
    <RecoilRoot>
      {user_type !== "SALES_MANAGER" ? (
        <PreventerPage />
      ) : (
        <ThemeProvider theme={themeOptions}>
          <CssBaseline />
          <PrimarySearchAppBar></PrimarySearchAppBar>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Box sx={{ m: 2 }} />
          <Box sx={{ m: 1 }} />
          <Container maxWidth="none" sx={{ backgroundColor: "white" }}>
            <Grid container spacing={2}>
              <Grid item key={2} xs={3}>
                <Box
                  sx={{
                    backgroundColor: themeOptions.palette.secondary.light,
                    overflow: "auto",

                    pl: 2,
                    pr: 2,
                    pb: 0,
                    mb: 0,
                  }}
                >
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Typography variant="h4" align="center" sx={{ p: 2 }}>
                      Sales Manager Functions
                    </Typography>

                    <nav aria-label="category-items">
                      <List>
                        {columnItems.map((item, index) => (
                          <ListItem
                            key={item[1]}
                            divider
                            sx={{
                              bgcolor:
                                pageIndex === index
                                  ? themeOptions.palette.white.main
                                  : themeOptions.palette.secondary.light,
                              color: themeOptions.palette.black.main,
                            }}
                          >
                            {pageIndex === index ? (
                              <ListItemButton sx={{ pr: 0 }}>
                                <ListItemText primary={item[0]} />
                                <ListItemIcon>
                                  <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                                </ListItemIcon>
                              </ListItemButton>
                            ) : (
                              <ListItemButton
                                onClick={handleOnClickList[index]}
                              >
                                <ListItemText primary={item[0]} />
                              </ListItemButton>
                            )}
                          </ListItem>
                        ))}
                      </List>
                    </nav>
                  </Box>
                  <Stack justifyContent="center" alignItems="center"></Stack>
                </Box>
              </Grid>
              <Grid item key={1} xs={9}>
                <Box
                  sx={{
                    padding: (2, 2, 2, 2),
                    backgroundColor: "white",
                  }}
                >
                  {props.widget}
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ m: 2 }} />
        </ThemeProvider>
      )}
      <Footer />
    </RecoilRoot>
  );
};

export default SalesManagerPanel;
