import React, { useState, useEffect } from "react";
import ProfilePageContainer from "./profilePageContainer";
import AddressListGetOld from "../payment/addressList/addressListGetOld";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddressListAddNew from "../payment/addressList/addressListAddNew";
import { getCookie } from "../recoils/atoms";
import { getData } from "../recoils/getterFunctions";

const access = getCookie("access_token");
let headersList = {
  Accept: "*/*",
  Authorization: `Bearer ${access}`,
};

let reqOptions = {
  url: "http://164.92.208.145/api/v1/user/addresses",
  method: "GET",
  headers: headersList,
};

const UpdateAddressPage = () => {
  const [isLoaded, setLoaded] = useState(false);

  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    getData("http://164.92.208.145/api/v1/user/addresses").then((res) => {
      res.data.push({
        name: "Add New Address",
      });

      console.log(res.data);
      setAddressList(res.data);
      setLoaded(true);
    });
  }, [isLoaded]);

  /*
  (rest)=>{
      rest.data.forEach((element) => {
        addressList.push(element);
      });
      setLoaded(true);
    
  }() //await axios(reqOptions);
  
  */

  //console.log("hello");

  //console.log(addressList);
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogContent, setDialogContent] = React.useState("");

  const handleClickOpen = (event) => {
    //console.log(event.currentTarget.getAttribute("id"));
    if (event.currentTarget.getAttribute("id") === "-1") {
      setDialogTitle("Add New Address");
      setDialogContent();
    } else {
      setDialogTitle("Edit Address");
      setDialogContent(addressList[event.currentTarget.getAttribute("id")]);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addressAdded, setAddressAdded] = useState(false);
  const [addressVal, setAddressVal] = useState([]);
  const newAddress = (val) => {
    console.log(val);

    setAddressVal(val);
    setAddressAdded(true);
  };
  useEffect(() => {}, [addressAdded]);
  const addressWidget = (
    <div>
      {addressList.map((address, index) => {
        return (
          <div
            key={`addressFullDiv ${index}`}
            style={{ display: "inline-flex" }}
          >
            <AddressListGetOld
              key={address.id}
              isProfile={true}
              isNew={index === addressList.length - 1 ? true : false}
              title={address["name"]}
              description={
                address["full_address"] +
                " " +
                address["postal_code"] +
                " " +
                address["province"] +
                " " +
                address["city"] +
                " " +
                address["country"]
              }
              id={address["id"]}
              link={"http://164.92.208.145/api/v1/user/addresses/"}
              onClick={handleClickOpen}
            />
          </div>
        );
      })}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <AddressListAddNew data={dialogContent} up={newAddress} />
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <ProfilePageContainer
      pageIndex={3}
      widget={isLoaded ? addressWidget : <div>Loading...</div>}
    ></ProfilePageContainer>
  );
};

export default UpdateAddressPage;
