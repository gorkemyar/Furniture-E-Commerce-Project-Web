import * as React from "react";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddressListGetOld from "../addressList/addressListGetOld";
import PaymentAddNew from "./paymentAddNew";
import { useState, useEffect } from "react";
import { getData } from "../../recoils/getterFunctions";
import { useRecoilState } from "recoil";
import { creditCardId, getCookie } from "../../recoils/atoms";

export default function AddressListForm(props) {
  //const addressList = props.addressList;
  const [isLoaded, setLoaded] = useState(false);
  const [creditId, setCreditID] = useRecoilState(creditCardId);

  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    getData("http://164.92.208.145/api/v1/user/credit").then((res) => {
      res.data.push({
        name: "Add New Address",
      });

      //console.log(res.data);
      setAddressList(res.data);
      setLoaded(true);
    });
  }, []);
  //console.log(addressList);
  const [value, setValue] = React.useState(0);
  const [newAddress, setNewAddress] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const handleChange = (event) => {
    //console.log("handleChange");
    //console.log(event.target.value);
    setValue(event.target.value);
    setUpdate(true);
    if (event.target.value === "new") {
      setNewAddress(true);
    } else {
      setNewAddress(false);
    }
  };

  useEffect(() => {
    setCreditID(value);
    if (value != 0) {
      document.cookie = `cardId=${value};path=/`;
    }
    setUpdate(false);
  }, [update]);

  const cardId = getCookie("cardId");
  return (
    <React.Fragment>
      <Box sx={{ maxWidth: 750, pl: 4, pr: 4, pb: 4, pt: 3 }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={cardId}
            onChange={handleChange}
            defaultValue={0}
          >
            {addressList.map((address) => {
              //console.log(index);
              if (address["name"] != "Add New Address")
                return (
                  <FormControlLabel
                    key={address["id"]}
                    value={address["id"]}
                    control={<Radio />}
                    label={
                      <AddressListGetOld
                        title={address["payment_method"]}
                        description={address["cardnumber"]}
                        postal_code={address["card_name"]}
                        province={address["CW"]}
                        city={address["expiry_date"]}
                        id={address["id"]}
                        link={"http://164.92.208.145/api/v1/user/credit/"}
                      />
                    }
                  />
                );
            })}
          </RadioGroup>
        </FormControl>
        <Box sx={{ ml: 4 }}>
          <AddressListGetOld
            onClick={() => {
              setNewAddress(!newAddress);
            }}
            isNew={true}
            title={"Add New Payment Method"}
            description={"Create a new payment method..."}
          />
        </Box>
      </Box>
      {newAddress ? <PaymentAddNew /> : <div> </div>}

      <Box sx={{ mt: 20, ml: 5, mr: 5 }}>
        <Typography color="text.secondary">
          The payment infrastructure for Voidture Inc. is provided by
          MasterCard.
        </Typography>
        <img src="/masterpass.png" width={300} alt="Mastercard" />
      </Box>
    </React.Fragment>
  );
}
