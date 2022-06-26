import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import themeOptions from "../../style/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, Stack, Divider, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { getCookie } from "../../recoils/atoms";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
const admin = getCookie("user_type");
const access = getCookie("access_token");
const Description = (props) => {
  const [outStock, setoutStock] = React.useState(false);
  const [notZero, setnotzero] = React.useState(false);
  const [stock, setStock] = React.useState(props.stock);
  const [price, setPrice] = React.useState(props.cost);
  const [discount, setDiscount] = React.useState(props.discount ?? 0);
  const removeHandler = () => {
    props.delete(props.id);
  };

  const decreaser = () => {
    console.log(`props id is ${parseInt(props.id)})`);
    console.log(props.id);
    setoutStock(false);
    if (props.count === 0) {
      setnotzero(true);
    } else {
      props.dec();
    }
  };
  const increaser = () => {
    setnotzero(false);
    if (props.count === props.stock) {
      setoutStock(true);
    } else {
      props.inc();
    }
  };
  const addFavourite = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      product_id: props.id,
    });

    let reqOptions = {
      url: "http://164.92.208.145/api/v1/users/favorites",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      console.log(response.data);
    });
  };
  React.useEffect(() => {}, [outStock, notZero]);
  return (
    <ThemeProvider theme={themeOptions}>
      <Box
        disableRipple
        sx={{
          width: 800,
          backgroundColor: "white",
          pl: 1,
          pr: 1,
          pt: 1,
          pb:
            props.description.length > 900
              ? 85
              : props.description.length > 750
              ? 76
              : props.description.length > 600
              ? 72
              : props.description.length > 500
              ? 66
              : props.description.length > 400
              ? 62
              : props.description.length > 300
              ? 58
              : props.description.length > 100
              ? 54
              : 40,
        }}
      >
        <Stack direction="column" spacing={2} sx={{ height: "60px" }}>
          <Stack direction="column" spacing={1}>
            <Stack direction="row" justifyContent="space-evenly">
              <Typography variant="body1">{props.title}</Typography>
              <IconButton aria-label="add to favorites" onClick={addFavourite}>
                <FavoriteIcon />
              </IconButton>
              {admin == "PRODUCT_MANAGER" && (
                <IconButton
                  onClick={() => {
                    console.log("hellooo there");
                    removeHandler();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
            <Divider />

            <Typography variant="body2">{props.description}</Typography>

            <Stack direction="row" spacing={1}>
              <Stack direction="column" spacing={1}>
                <Box sx={{ m: 0.5 }} />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Stock Availability: {stock}
                </Typography>
              </Stack>
              {admin == "PRODUCT_MANAGER" && (
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "20ch", height: "4ch" },
                  }}
                  noValidate
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);

                    const newStock = data.get("stock");
                    console.log(newStock);

                    let headersList = {
                      Accept: "*/*",
                      Authorization: `Bearer ${access}`,
                    };

                    let reqOptions = {
                      url: `http://164.92.208.145/api/v1/products/${props.id}/updateStock?stock=${newStock} `,
                      method: "PATCH",
                      headers: headersList,
                    };

                    axios
                      .request(reqOptions)
                      .then(function (response) {
                        console.log(response.data);
                        setStock(newStock);
                      })
                      .catch((res) => {
                        console.log(res);
                      });
                  }}
                  autoComplete="off"
                  direction="row"
                >
                  <TextField
                    sx={{
                      "& > :not(style)": { m: 1, width: "20ch", height: "4ch" },
                    }}
                    id="stock"
                    name="stock"
                    label="New Stock Count"
                    variant="outlined"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff6600",
                      margin: (8, 1, 8, 1.2),
                      padding: (8, 1, 8, 1),
                      justify: "flex-end",
                      align: "right",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      Change Stock
                    </Typography>
                  </Button>
                </Box>
              )}
            </Stack>
          </Stack>

          <Typography variant="body1" color="text.secondary" fontWeight="bold">
            Model: {props.model}
          </Typography>

          <Stack direction="column" spacing={1}>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
            >
              Item Count
            </Typography>
            <Stack
              direction="row"
              maxWidth="170px"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                border: 2,
                borderColor: "black",
                borderRadius: 6,
                p: 0,
                m: 0,
              }}
            >
              <CardActions>
                <IconButton aria-label="share" onClick={decreaser}>
                  <RemoveIcon />
                </IconButton>
              </CardActions>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ width: 2, bgcolor: themeOptions.palette.black.main }}
              />

              <Stack direction="column">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                  sx={{
                    p: 2,
                  }}
                >
                  {props.count}
                </Typography>
              </Stack>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ width: 2, bgcolor: themeOptions.palette.black.main }}
              />
              <CardActions>
                <IconButton aria-label="share" onClick={increaser}>
                  <AddIcon />
                </IconButton>
              </CardActions>
            </Stack>
            {notZero && (
              <Typography variant="body2" fontWeight="bold" color="red">
                *You can not go below 0!
              </Typography>
            )}
            {outStock && (
              <Typography variant="body2" fontWeight="bold" color="red">
                *Stock Limit
              </Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={1}>
            {discount == 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="bold"
                sx={{
                  marginTop: 2,
                }}
              >
                Product Price: {price}$
              </Typography>
            ) : (
              <Stack direction="row">
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="bold"
                  sx={{
                    marginTop: 2,
                  }}
                >
                  Product Price:
                </Typography>
                <div>&nbsp;</div>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="bold"
                  sx={{
                    marginTop: 2,
                    textDecoration: "line-through",
                  }}
                >
                  {price}$
                </Typography>
                <div>&nbsp;</div>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="bold"
                  sx={{
                    marginTop: 2,
                  }}
                >
                  {price - (price * discount) / 100}$
                </Typography>
              </Stack>
            )}

            {admin == "SALES_MANAGER" && (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { height: "4ch" },
                }}
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const newPrice = data.get("price");

                  let headersList = {
                    Accept: "*/*",
                    Authorization: `Bearer ${access}`,
                  };

                  let reqOptions = {
                    url: `http://164.92.208.145/api/v1/products/${props.id}/updatePrice?price=${newPrice} `,
                    method: "POST",
                    headers: headersList,
                  };
                  axios
                    .request(reqOptions)
                    .then(function (response) {
                      console.log(response.data);
                      setPrice(newPrice);
                    })
                    .catch((res) => {
                      console.log(res);
                    });
                }}
                autoComplete="off"
                direction="row"
              >
                <TextField
                  sx={{
                    "& > :not(style)": { m: 1, width: "15ch", height: "4ch" },
                  }}
                  id="price"
                  name="price"
                  label="New Price"
                  variant="outlined"
                  type="number"
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff6600",
                    marginLeft: 0.5,
                    marginTop: 1.3,
                    padding: (8, 1, 8, 1),
                    justify: "flex-end",
                    align: "right",
                  }}
                >
                  <Typography sx={{ color: "black" }}>Change Price</Typography>
                </Button>
              </Box>
            )}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
              sx={{
                marginTop: 2,
              }}
            >
              Discount Rate: {discount}%
            </Typography>
            {admin == "SALES_MANAGER" && (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { height: "4ch" },
                }}
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const newDiscount = data.get("discount");

                  let headersList = {
                    Accept: "*/*",
                    Authorization: `Bearer ${access}`,
                  };

                  let reqOptions = {
                    url: `http://164.92.208.145/api/v1/products/${props.id}/discount?discount=${newDiscount} `,
                    method: "POST",
                    headers: headersList,
                  };
                  axios
                    .request(reqOptions)
                    .then(function (response) {
                      console.log(response.data);
                      setDiscount(newDiscount);
                    })
                    .catch((res) => {
                      console.log(res);
                    });
                }}
                autoComplete="off"
                direction="row"
              >
                <TextField
                  sx={{
                    "& > :not(style)": {
                      m: 1,
                      width: "15ch",
                      height: "4ch",
                      paddingBottom: 2,
                    },
                  }}
                  id="discount"
                  name="discount"
                  label="New Discount"
                  variant="outlined"
                  type="number"
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff6600",
                    marginLeft: 0.5,
                    marginTop: 1.3,
                    padding: (8, 1, 8, 1),
                    justify: "flex-end",
                    align: "right",
                  }}
                >
                  <Typography sx={{ color: "black" }}>
                    Change Discount
                  </Typography>
                </Button>
              </Box>
            )}
          </Stack>
          <Typography variant="body1" color="text.secondary" fontWeight="bold">
            Total Price:{" "}
            {(price - (price * discount) / 100) * props.count.toFixed(2)}$
          </Typography>
          <CardActions>
            <Button
              onClick={props.clickHandler}
              variant="contained"
              sx={{
                backgroundColor: "#ff6600",
                display: "block",
                padding: (8, 1, 8, 1),
                justify: "center",
              }}
            >
              <Typography sx={{ color: "black" }}>Add to Basket</Typography>
            </Button>
          </CardActions>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
export default Description;
