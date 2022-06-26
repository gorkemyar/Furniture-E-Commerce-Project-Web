import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";
import AddressListAddNew from "./addressListAddNew";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddressListGetOld from "./addressListGetOld";
import { useState, useEffect } from "react";
import { getData } from "../../recoils/getterFunctions";
import { getCookie } from "../../recoils/atoms";
export default function AddressListForm(props) {
  //const addressList = props.addressList;
  const [isLoaded, setLoaded] = useState(false);

  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    getData("http://164.92.208.145/api/v1/user/addresses").then((res) => {
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
  const addressIdHolder2 = () => {
    props.addressIdHolder(value);
  };

  const handleChange = (event) => {
    //console.log("handleChange");
    //console.log(event.target.value);
    setValue(event.target.value);

    //console.log(value);
    if (event.target.value === "new") {
      setNewAddress(true);
    } else {
      setNewAddress(false);
    }
  };

  useEffect(() => {
    if (value != 0) {
      document.cookie = `addressId=${value};path=/`;
    }

    addressIdHolder2();
  }, [value]);
  const addressVal = Number(getCookie("addressId"));

  return (
    <React.Fragment>
      <Box sx={{ maxWidth: 750, pl: 4, pr: 4, pb: 4, pt: 3 }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            defaultValue={addressVal}
            value={addressVal}
            onChange={handleChange}
          >
            {isLoaded ? (
              addressList.map((address) => {
                //console.log(index);
                //console.log(address["id"]);
                if (address["name"] != "Add New Address")
                  return (
                    <FormControlLabel
                      key={address["id"]}
                      value={address["id"]}
                      control={<Radio />}
                      label={
                        <AddressListGetOld
                          title={address["name"]}
                          description={address["full_address"]}
                          postal_code={address["postal_code"]}
                          province={address["province"]}
                          city={address["city"]}
                          country={address["country"]}
                          id={address["id"]}
                          link={"http://164.92.208.145/api/v1/user/addresses/"}
                        />
                      }
                    />
                  );
              })
            ) : (
              <div>Loading</div>
            )}
          </RadioGroup>
        </FormControl>
        <Box sx={{ ml: 4 }}>
          <AddressListGetOld
            onClick={() => {
              setNewAddress(!newAddress);
            }}
            isNew={true}
            title={"Add New Address"}
            description={"Create a new address..."}
          />
        </Box>
      </Box>
      {newAddress ? <AddressListAddNew up={() => {}} /> : <div> </div>}
    </React.Fragment>
  );
}
