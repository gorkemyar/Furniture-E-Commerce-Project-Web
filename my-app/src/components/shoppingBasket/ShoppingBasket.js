import React from "react";
import ReactDOM from "react-dom";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  Grid,
  Card,
  Stack,
  Button,
} from "@mui/material";
import PrimarySearchAppBar from "../header/AppBar";
import ResponsiveAppBar from "../header/AppBarUnder";
import Footer from "../footer/Footer";
import themeOptions from "../style/theme";
import { ThemeProvider } from "@emotion/react";
import ShoppingCard from "./ShoppingCard";
import { CssBaseline } from "@mui/material/";
import { Link } from "react-router-dom";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { getCookie, loggedState } from "../recoils/atoms";
import { useState, useEffect } from "react";
import {
  createShoppingDict,
  getDataWithoutAccess,
  getData,
  createOrderCookie,
} from "../recoils/getterFunctions";
import axios from "axios";
import { totalCost as tc } from "../recoils/atoms";

const access = getCookie("access_token");

//document.cookie = "orderList=1 2 2 3 3 2 2 2 2 4 3 4";
let mydict = createShoppingDict();
const ShoppingBasket = () => {
  const [tCost, setTCost] = useRecoilState(tc);
  //console.log(mydict);

  const [isLoggin, setIsLogged] = useRecoilState(loggedState);
  const [filter, setFilter] = React.useState(-1);
  const [change1, setChange1] = React.useState(-1);
  const [change2, setChange2] = React.useState(-1);

  const [logChange1, setLogChange1] = React.useState(-1);
  const [logChange2, setLogChange2] = React.useState(-1);
  const [stockQuan, setStockQuan] = useState([0, 0]);
  const [isLoaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  //console.log(mydict);

  useEffect(() => {
    if (isLoggin) {
      getData(`http://164.92.208.145/api/v1/users/shopping_cart`)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      for (let proId in mydict) {
        //console.log(proId);
        //console.log(proId);
        getDataWithoutAccess(
          `http://164.92.208.145/api/v1/products/${proId}`
        ).then((res) => {
          //console.log(res.data);
          if (res.data.stock < mydict[res.data.id]) {
            mydict[res.data.id] = res.data.stock;
            if (!isLoggin) {
              createOrderCookie(mydict);
            }
          }
          setProducts((prev) => {
            return [...prev, res.data];
          });
        });
      }
      setLoaded(true);
    }
  }, []);
  const isIn = (item) => {
    for (let i = 0; i < products.length; i++) {
      if (item == products[i].product.id) {
        if (products[i].product.stock <= products[i].quantity)
          return products[i].product.stock - 1;
        return products[i].quantity;
      }
    }
    return 0;
  };

  const updateProducts = (item, newcount) => {
    for (let i = 0; i < products.length; i++) {
      if (item == products[i].product.id) {
        products[i].quantity = newcount;
      }
    }
    return 0;
  };
  useEffect(() => {
    console.log(isLoaded, isLoggin);
    if (isLoggin && isLoaded) {
      if (Object.keys(mydict).length > 0) {
        for (let item in mydict) {
          for (let i = 0; i < mydict[item]; i++) {
            let num = isIn(item, products);
            if (i > 0 || num > 0) {
              //update
              console.log("update", item);
              let bodyContent = JSON.stringify({
                product_id: Number(item),
                quantity: 1 + num,
                created_at: "2022-05-07T09:09:00.438084",
              });
              axios
                .patch(
                  "http://164.92.208.145/api/v1/users/shopping_cart/",
                  bodyContent,
                  {
                    headers: {
                      Accept: "*/*",
                      Authorization: `Bearer ${access}`,
                      "Content-Type": "application/json",
                    },
                  }
                )
                .catch((res) => {
                  console.log(res);
                  updateProducts(Number(item), num + 1);
                })
                .then((err) => {
                  console.log(err);
                });
            } else {
              //post
              console.log("new item", Number(item));

              let bodyContent = JSON.stringify({
                product_id: Number(item),
                quantity: 1,
                created_at: "2022-05-07T09:09:00.438084",
              });
              axios
                .post(
                  "http://164.92.208.145/api/v1/users/shopping_cart/",
                  bodyContent,
                  {
                    headers: {
                      Accept: "*/*",
                      Authorization: `Bearer ${access}`,
                      "Content-Type": "application/json",
                    },
                  }
                )
                .catch((res) => {
                  console.log(res);
                  updateProducts(Number(item), 1);
                })
                .then((err) => {
                  console.log(err);
                });
            }
          }
        }
      }
      document.cookie = "orderList=";
      mydict = [];
    }
  }, [isLoaded]);

  const removeCardHandler = (toDelete) => {
    setFilter(toDelete);
    //console.log(filter);
  };
  //console.log(getCookie("orderList"));
  //console.log(products);
  const filterCards = () => {
    //need post request you can make it in useeffect
    if (filter != -1) {
      delete mydict[filter];
      console.log(mydict);
      if (!isLoggin) {
        createOrderCookie(mydict);
      }

      //window.location.reload();
    }
  };

  const filterCards2 = () => {
    //need post request you can make it in useeffect
    if (filter != -1) {
      axios
        .delete(`http://164.92.208.145/api/v1/users/shopping_cart/${filter}`, {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          let newpro = products.filter(
            (product) => product.product.id !== filter
          );
          setProducts(newpro);
          console.log(products);
        })
        .catch((err) => {
          console.log(err);
        });

      //window.location.reload();
    }
  };

  const incCard = () => {
    //need post request you can make it in useeffect
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === change1) {
        if (mydict[change1] < products[i].stock) {
          mydict[change1]++;
          if (!isLoggin) {
            createOrderCookie(mydict);
          }
        }
        return;
      }
    }
  };

  const decCard = () => {
    //need post request you can make it in useeffect
    for (let i = 0; i < products.length; i++) {
      console.log(change2);
      if (products[i].id === change2) {
        if (mydict[change2] > 0) {
          mydict[change2]--;
          if (!isLoggin) {
            createOrderCookie(mydict);
          }
        }
        return;
      }
    }
  };
  const incCard2 = () => {
    //need post request you can make it in useeffect
    console.log(logChange2);
    if (logChange1 != -1) {
      let bodyContent = JSON.stringify({
        product_id: Number(logChange1),
        quantity: stockQuan[1] + 1,
      });
      axios
        .patch(
          "http://164.92.208.145/api/v1/users/shopping_cart/",
          bodyContent,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
        )
        .catch((res) => {
          console.log(res);
        })
        .then((err) => {
          console.log(err);
        });
      for (let i = 0; i < products.length; i++) {
        if (products[i].product.id === logChange1) {
          products[i].quantity++;
          return;
        }
      }
    }
  };

  const decCard2 = () => {
    //need post request you can make it in useeffect
    //console.log(logChange2);
    if (logChange2 != -1) {
      let bodyContent = JSON.stringify({
        product_id: Number(logChange2),
        quantity: stockQuan[1] - 1,
      });
      axios
        .patch(
          "http://164.92.208.145/api/v1/users/shopping_cart/",
          bodyContent,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
        )
        .catch((res) => {
          console.log(res);
        })
        .then((err) => {
          console.log(err);
        });
      for (let i = 0; i < products.length; i++) {
        if (products[i].product.id === logChange2) {
          products[i].quantity--;
          return;
        }
      }
    }
  };

  const decreaserHandler = (toChange) => {
    setChange2(toChange);
  };
  const increaserHandler = (toChange) => {
    setChange1(toChange);
  };
  const decreaserHandler2 = (toChange, stock, quan) => {
    setLogChange2(toChange);
    setStockQuan([stock, quan]);
  };
  const increaserHandler2 = (toChange, stock, quan) => {
    setLogChange1(toChange);
    setStockQuan([stock, quan]);
  };

  React.useEffect(() => {
    //window.location.reload();
    isLoggin ? filterCards2() : filterCards();
    setFilter(-1);
  }, [filter]);

  React.useEffect(() => {
    decCard();
    setChange2(-1);
  }, [change2]);
  React.useEffect(() => {
    incCard();
    setChange1(-1);
  }, [change1]);

  React.useEffect(() => {
    decCard2();
    setLogChange2(-1);
  }, [logChange2]);
  React.useEffect(() => {
    incCard2();
    setLogChange1(-1);
  }, [logChange1]);
  let totalCost1 = 0;
  let totalDiscount = 0;
  products.map((card) => {
    let count = isLoggin ? card.quantity : mydict[card.id];
    let cost1 = isLoggin ? card.product.price : card.price;
    let discount = isLoggin ? card.product.discount : card.discount;
    totalDiscount += count * ((cost1 * discount) / 100);
    totalCost1 += count * (cost1 - (cost1 * discount) / 100);
  });

  document.cookie = `totalCost=${totalCost1};path=/`;
  document.cookie = `discount=${totalDiscount};path=/`;
  setTCost(totalCost1);

  return (
    <RecoilRoot>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box sx={{ m: 2 }} />
        <Container maxWidth="lg" sx={{}}>
          <Grid container spacing={2}>
            <Grid item key={1} xs={9}>
              <Box
                sx={{
                  padding: (2, 2, 2, 2),
                  backgroundColor: "white",
                }}
              >
                {isLoaded && !isLoggin ? (
                  <List>
                    {products.map((card) => (
                      <ListItem key={`a${card.id}`}>
                        <ShoppingCard
                          imageId={
                            card.photos[0] != null
                              ? card.photos[0].photo_url
                              : ""
                          }
                          discount={card.discount}
                          model={card.model}
                          number={card.number}
                          cost={card.price}
                          description={card.description}
                          title={card.title}
                          id={card.id}
                          delete={removeCardHandler}
                          stock={card.stock}
                          count={mydict[card.id]}
                          dec={() => {
                            decreaserHandler(card.id);
                          }}
                          inc={() => {
                            increaserHandler(card.id);
                          }}
                        ></ShoppingCard>
                      </ListItem>
                    ))}
                  </List>
                ) : isLoaded && isLoggin ? (
                  <List>
                    {products.map((card) => (
                      <ListItem key={`a${card.product.id}`}>
                        <ShoppingCard
                          imageId={
                            card.product.photos[0] != null
                              ? card.product.photos[0].photo_url
                              : ""
                          }
                          discount={card.product.discount ?? 0}
                          model={card.product.model}
                          number={card.product.number}
                          cost={card.product.price}
                          description={card.product.description}
                          title={card.product.title}
                          id={card.product.id}
                          delete={removeCardHandler}
                          stock={card.product.stock}
                          count={card.quantity}
                          dec={() => {
                            decreaserHandler2(
                              card.product.id,
                              card.product.stock,
                              card.quantity
                            );
                          }}
                          inc={() => {
                            increaserHandler2(
                              card.product.id,
                              card.product.stock,
                              card.quantity
                            );
                          }}
                        ></ShoppingCard>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <div>Loading...</div>
                )}
                <Divider sx={{ size: 100 }} />
                <Link to="/" style={{ color: "black" }}>
                  <Stack direction="row" sx={{ mt: 2 }}>
                    <ArrowBackIosOutlinedIcon />
                    <Typography sx={{ color: "black" }}>
                      {" "}
                      Back to Shopping
                    </Typography>
                  </Stack>
                </Link>
              </Box>
            </Grid>

            <Grid item key={2} xs={3}>
              <Box
                sx={{
                  backgroundColor: "white",
                  overflow: "auto",
                }}
              >
                <Card sx={{ backgroundColor: "#EAECEC", borderRadius: 0 }}>
                  <Typography
                    align="center"
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: 20 }}
                  >
                    Order Summary
                  </Typography>
                </Card>
                <Card
                  elevation={0}
                  sx={{ padding: (2, 2, 2, 2), borderRadius: 0 }}
                >
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
                      {tCost + totalDiscount}$
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
                      -{totalDiscount}$
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
                  {isLoggin && (
                    <Link
                      to="/address-list"
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
                          Confirm Cart
                        </Typography>
                      </Button>
                    </Link>
                  )}
                  {!isLoggin && (
                    <Link
                      to="/SignIn"
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
                          Sign In to Purchase
                        </Typography>
                      </Button>
                    </Link>
                  )}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box sx={{ m: 2 }} />
      </ThemeProvider>
      <Footer />
    </RecoilRoot>
  );
};
export default ShoppingBasket;
