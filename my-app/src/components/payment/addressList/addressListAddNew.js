import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button } from "@mui/material";
import themeOptions from "../../style/theme";
import { getCookie } from "../../recoils/atoms";
import axios from "axios";
const access = getCookie("access_token");

let headersList = {
  Authorization: `Bearer ${access}`,
  "Content-Type": "application/json",
};
console.log(access);
const AddressListAddNew = (props) => {
  const data = props.data;

  const [isNew, setisNew] = React.useState(false);
  const [New, setNew] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data2 = new FormData(event.currentTarget);
    console.log(data2);
    let bodyContent = JSON.stringify({
      name: data2.get("addressName"),
      full_address: data2.get("address"),
      postal_code: data2.get("zip").toString(),
      city: data2.get("city"),
      province: data2.get("state"),
      country: data2.get("country"),
      personal_name: data2.get("name"),
      phone_number: data2.get("phoneNumber"),
    });

    axios
      .post("http://164.92.208.145/api/v1/user/addresses", bodyContent, {
        headers: headersList,
      })
      .then((response) => {
        setNew(response.data);
        setisNew(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    props.up(New);
  }, [isNew]);
  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ maxWidth: 750, p: 4 }}
      >
        <TextField
          required
          id="addressName"
          name="addressName"
          label="Address Name"
          //defaultValue={data ? data["title"] : ""}
          fullWidth
          autoComplete="address-name"
          variant="standard"
        />
        <br></br>
        <br></br>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Your Name"
              //defaultValue={data ? data["name"] : ""}
              fullWidth
              autoComplete="full-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              defaultValue={data ? data["phoneNumber"] : ""}
              fullWidth
              autoComplete="full-name"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              defaultValue={data ? data["description"] : ""}
              minRows={2}
              fullWidth
              multiline
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              defaultValue={data ? data["city"] : ""}
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              defaultValue={data ? data["province"] : ""}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              type="number"
              label="Zip / Postal code"
              defaultValue={data ? data["zip"] : ""}
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              defaultValue={data ? data["country"] : ""}
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
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
};

export default AddressListAddNew;
