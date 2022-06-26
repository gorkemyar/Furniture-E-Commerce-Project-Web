import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import themeOptions from "../../../style/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { getCookie, loggedState } from "../../../recoils/atoms";
import { useRecoilValue } from "recoil";
import { getData } from "../../../recoils/getterFunctions";
import { addCardtoCookie } from "../../../recoils/getterFunctions";

import axios from "axios";
const access = getCookie("access_token");

const CardItem = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const isLogged = useRecoilValue(loggedState);
  const [products, setProducts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

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

  useEffect(() => {
    if (isLogged) {
      getData(`http://164.92.208.145/api/v1/users/shopping_cart`)
        .then((res) => {
          //console.log(res.data);
          setProducts(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const addBasket = async (proId) => {
    if (isLogged) {
      if (isLoaded) {
        console.log("Post proId to shopping cart endpoint");
        let num = isIn(proId, products);
        if (num > 0) {
          //update
          console.log("update", proId);
          let bodyContent = JSON.stringify({
            product_id: Number(proId),
            quantity: 1 + num,
            created_at: "2022-05-07T09:09:00.438084",
          });
          await axios
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
        } else {
          //post
          console.log("new item", Number(proId));

          let bodyContent = JSON.stringify({
            product_id: Number(proId),
            quantity: 1,
            created_at: "2022-05-07T09:09:00.438084",
          });
          await axios
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
            })
            .then((err) => {
              console.log(err);
            });
        }
      }
    } else {
      console.log("from cart", proId);
      addCardtoCookie(proId);
      console.log(getCookie("orderList"));
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const ratingChanged = () => {
    console.log("hello");
  };

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline></CssBaseline>
      <Card sx={{ maxWidth: 400 }}>
        <Link
          to={`/product/${props.title}`}
          underline="none"
          state={{ id: props.productId }}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={props.imageId}
            alt="Voidture not Found"
          />

          <Typography
            sx={{ pb: 2, pt: 1, fontSize: 10 }}
            style={{ textAlign: "center" }}

            //subheader="Until when promotion continues"
          >
            {props.title}
          </Typography>
        </Link>

        <Stack spacing={{ xs: 0, sm: 0, md: 0 }} sx={{ paddingBottom: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ height: "30px", ml: 1, pb: 2 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              {props.cost}
            </Typography>
            <CardActions>
              <IconButton
                aria-label="share"
                onClick={() => {
                  addBasket(props.productId);
                }}
              >
                <ShoppingBasketOutlinedIcon />
              </IconButton>
            </CardActions>
          </Stack>
        </Stack>
      </Card>
    </ThemeProvider>
  );
};
export default CardItem;
