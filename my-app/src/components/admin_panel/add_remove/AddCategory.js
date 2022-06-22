import * as React from "react";
import Link from "@mui/material/Link";
import {
  Card,
  Button,
  Typography,
  Stack,
  Grid,
  Rating,
  Box,
  TextField,
} from "@mui/material";
import AdminPanelContainer from "../AdminPanel";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../recoils/atoms";

const access = getCookie("access_token");
const AddCategories = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = React.useState(3);
  const addNewCategory = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newCat = data.get("catName");
    const newCatImage = data.get("myImage");
    var binaryBlob;
    var reader = new FileReader();
    reader.onloadend = function () {
      //console.log("Encoded Base 64 File String:", reader.result);

      /******************* for Binary ***********************/
      var data = reader.result.split(",")[1];
      binaryBlob = atob(data);
      console.log("Encoded Binary File String:", binaryBlob);
      //console.log(newCatImage);
    };
    reader.readAsDataURL(newCatImage);

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${access}`,
      "Content-Type": "image/jpeg",
    };
    let bodyContent = binaryBlob;
    let reqOptions = {
      url: `http://164.92.208.145/api/v1/categories/?title=${newCat}&order_id=0`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    axios
      .request(reqOptions)
      .then(function (response) {
        console.log(response.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const newCategoryWidget = (
    <Card>
      <Box sx={{ m: 2 }} />
      <Typography sx={{ fontSize: 20 }} pl={2}>
        Add New Category
      </Typography>
      <Box sx={{ m: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="form"
        onSubmit={addNewCategory}
        noValidate
      >
        <Grid container justifyContent="center">
          <TextField
            id="catName"
            label="New Category Name"
            name="catName"
            fullWidth
            sx={{ padding: (1, 1, 1, 1) }}
          />
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            Add Category Image
          </Typography>
          <Box sx={{ m: 1 }} />
          {selectedImage && (
            <div>
              <img
                alt="not fount"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          )}
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
            }}
          />
          <Box sx={{ m: 1 }} />
        </Grid>

        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
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
            <Typography sx={{ color: "black" }}>New Category</Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );

  return (
    <AdminPanelContainer
      pageIndex={0}
      widget={newCategoryWidget}
    ></AdminPanelContainer>
  );
};

export default AddCategories;
