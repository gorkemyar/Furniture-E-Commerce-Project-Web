import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import themeOptions from "../../style/theme";
import { Button } from "@mui/material";
import { getCookie } from "../../recoils/atoms";
import axios from "axios";
const access = getCookie("access_token");

let headersList = {
  Authorization: `Bearer ${access}`,
  "Content-Type": "application/json",
};

export default function PaymentAddNew(props) {
  const data = props.data;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data2 = new FormData(event.currentTarget);
    console.log(data2.get("paymentName"));
    console.log(data2);
    let bodyContent = JSON.stringify({
      payment_method: data2.get("paymentName"),
      card_name: data2.get("cardName"),
      cardnumber: data2.get("cardNumber"),
      CW: data2.get("cvv"),
      expiry_date: data2.get("expDate"),
    });

    console.log(bodyContent);
    axios
      .post("http://164.92.208.145/api/v1/user/credit", bodyContent, {
        headers: headersList,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ maxWidth: 750, p: 4 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="paymentName"
              name="paymentName"
              label="Payment Method Name"
              defaultValue={data ? data["title"] : ""}
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              defaultValue={data ? data["name"] : ""}
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              type="number"
              label="Card number"
              fullWidth
              defaultValue={data ? data["cardNumber"] : ""}
              autoComplete="cc-number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Expiry date"
              fullWidth
              defaultValue={data ? data["expireDate"] : ""}
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              defaultValue={data ? data["cvv"] : ""}
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button
              sx={{ bgcolor: themeOptions.palette.primary.light }}
              type="submit"
            >
              <Typography
                variant="button"
                sx={{ color: themeOptions.palette.black.main }}
              >
                Save
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
