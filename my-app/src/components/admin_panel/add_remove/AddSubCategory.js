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
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../recoils/atoms";
import AddProductDropDown from "./AddProductDropDown";

const access = getCookie("access_token");
const AddSubCategory = (props) => {
  const [categoryList, setDataCategory] = useState([]);
  const [isLoadedCategory, setIsLoadedCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(-1);
  const [categoryName, setCategoryName] = useState("");

  const getDataCategory = async () => {
    const { data } = await axios({
      method: "get",
      url: "http://164.92.208.145/api/v1/categories/?skip=0&limit=100",
      withCredentials: false,
    });

    setDataCategory(data.data);
    console.log(data.data);
    setIsLoadedCategory(true);
  };
  useEffect(() => {
    getDataCategory(categoryId);
  }, [categoryId]);

  const handleCategoryName = (selectedCategoryId) => {
    console.log("selected category ", selectedCategoryId);
    setCategoryId(selectedCategoryId);
    console.log("catlist:", categoryList);
    // set the subcategory name by getting it from the subcategory list where the id is the same as the selected subcategory id
    setCategoryName(
      categoryList.find((category) => category.id === selectedCategoryId).title
    );
    console.log("catname:", categoryName);
  };

  const addNewCategory = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newCat = data.get("catName");

    let headersList = {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      title: newCat,
      order_id: 0,
    });

    await axios
      .post(
        `http://164.92.208.145/api/v1/categories/${categoryId}/subcategory`,
        bodyContent,
        {
          headers: headersList,
        }
      )
      .then((response) => {
        console.log("response", response);
        //props.adderHandler(response.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newCategoryWidget = (
    <Card sx={{ marginTop: 15 }}>
      <Card>
        <Typography sx={{ fontSize: 20 }} pl={2}>
          Select Category to add Subcategory
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AddProductDropDown
            handleCategoryName={handleCategoryName}
            dataList={isLoadedCategory ? categoryList : []}
            defaultValue={"Select Category"}
          ></AddProductDropDown>
        </Box>
      </Card>
      <Box sx={{ m: 2 }} />
      {categoryName != "" && (
        <>
          <Typography sx={{ fontSize: 20 }} pl={2}>
            Add New Subcategory
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
            </Grid>

            <Box
              m={1}
              //margin
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                type="form"
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
        </>
      )}
    </Card>
  );

  return (
    <AdminPanelContainer
      pageIndex={1}
      widget={newCategoryWidget}
    ></AdminPanelContainer>
  );
};

export default AddSubCategory;
