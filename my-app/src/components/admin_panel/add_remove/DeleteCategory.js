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
import { useEffect } from "react";
import AddProductDropDown from "./AddProductDropDown";
const access = getCookie("access_token");
const DeleteCategories = (props) => {
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

  const deleteCategory = (event) => {
    event.preventDefault();

    let headersList = {
      Authorization: `Bearer ${access}`,
      "Content-Type": "multipart/form-data",
    };
    let bodyContent = "";
    let reqOptions = {
      url: `http://164.92.208.145/api/v1/categories/${categoryId}`,
      method: "DELETE",
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

  const deleteCategoryWidget = (
    <Stack direction="column">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="form"
        onSubmit={deleteCategory}
        noValidate
      >
        <Card sx={{ marginTop: 15 }}>
          <Typography sx={{ fontSize: 20 }} pl={2}>
            Delete Category
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
            <Typography sx={{ color: "black" }}>Delete Category</Typography>
          </Button>
        </Box>
      </Box>
    </Stack>
  );

  return (
    <AdminPanelContainer
      pageIndex={2}
      widget={deleteCategoryWidget}
    ></AdminPanelContainer>
  );
};

export default DeleteCategories;
