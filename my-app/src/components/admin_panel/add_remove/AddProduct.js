import * as React from "react";
import Link from "@mui/material/Link";
import { Card, Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import AdminPanelContainer from "../AdminPanel";
import axios from "axios";
import { getCookie } from "../../recoils/atoms";
import AddProductDropDown from "./AddProductDropDown";
import AddProductForm from "./AddProductForm";

const access = getCookie("access_token");
const AddProduct = (props) => {
  // Get categories to add product
  const [categoryList, setDataCategory] = useState([]);
  const [isLoadedCategory, setIsLoadedCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(-1);
  const [categoryName, setCategoryName] = useState("");

  // Get categories and fill the select category button
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

  // get the dropdown menu category names
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

  const [subcategoryList, setDataSubcategory] = useState([]);
  const [isLoadedSubcategory, setIsLoadedSubcategory] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState(-1);
  const [subcategoryName, setSubcategoryName] = useState("");
  // Get subcategories and fill the select subcategory button with the given category id
  const getDataSubcategory = async (categoryId) => {
    const { data } = await axios({
      method: "get",
      url: `http://164.92.208.145/api/v1/categories/${categoryId}`,
      withCredentials: false,
    });
    setDataSubcategory(data.data.subcategories);
    setIsLoadedSubcategory(true);
  };

  useEffect(() => {
    categoryId != -1 && getDataSubcategory(categoryId);
  }, [categoryId]);

  // get the dropdown menu subcategory names
  const handleSubCategoryName = (selectedSubcategoryId) => {
    console.log("selected category ", selectedSubcategoryId);
    setSubcategoryId(selectedSubcategoryId);
    console.log("sublist:", subcategoryList);
    // set the subcategory name by getting it from the subcategory list where the id is the same as the selected subcategory id
    setSubcategoryName(
      subcategoryList.find(
        (subcategory) => subcategory.id === selectedSubcategoryId
      ).title
    );
    console.log("catname:", categoryName);
    console.log("subname:", subcategoryName);
  };

  //Product added time to add image
  const [productId, setProductId] = useState(-1);
  const [selectedImage, setSelectedImage] = useState(null);

  const adderHandler = (id) => {
    console.log("tuttmu");
    setProductId(id);
  };

  const addImageHandler = async () => {
    //console.log(selectedImage);
    console.log(productId);
    let headersList = {
      Authorization: `Bearer ${access}`,
      "Content-Type": "multipart/form-data",
    };
    var formData = new FormData();
    formData.append("files", selectedImage);

    await axios
      .post(
        `http://164.92.208.145/api/v1/products/${productId}/photo/add`,
        formData,
        {
          headers: headersList,
        }
      )
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newProductWidget = (
    <Card>
      <Box sx={{ m: 2 }} />
      <Typography sx={{ fontSize: 20 }} pl={2}>
        Add New Product
      </Typography>
      <Box sx={{ m: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AddProductDropDown
          key={1}
          handleCategoryName={handleCategoryName}
          dataList={isLoadedCategory ? categoryList : []}
          defaultValue={"Select Category"}
        ></AddProductDropDown>
        {categoryId === -1 ? (
          <div></div>
        ) : (
          <AddProductDropDown
            key={2}
            handleCategoryName={handleSubCategoryName}
            dataList={isLoadedSubcategory ? subcategoryList : []}
            defaultValue={"Select Subcategory"}
          ></AddProductDropDown>
        )}
        {subcategoryId === -1 ? (
          <div></div>
        ) : (
          <AddProductForm
            categoryId={categoryId}
            subcategoryId={subcategoryId}
            categoryName={categoryName}
            subcategoryName={subcategoryName}
            adderHandler={(id) => {
              console.log(id);
              adderHandler(id);
            }}
          ></AddProductForm>
        )}
      </Box>
    </Card>
  );
  const addImage = (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
      >
        <Grid container justifyContent="center">
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            Add Product Image
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
            type="button"
            variant="contained"
            onClick={addImageHandler}
            sx={{
              backgroundColor: "#ff6600",
              display: "block",
              padding: (8, 1, 8, 1),
              justify: "flex-end",
              align: "right",
            }}
          >
            <Typography sx={{ color: "black" }}>Add Image</Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
  return (
    <AdminPanelContainer
      pageIndex={3}
      widget={productId == -1 ? newProductWidget : addImage}
    ></AdminPanelContainer>
  );
};

export default AddProduct;

// TODO
//<AddProductDropDown handleCategoryName={handleCategoryName} dataList ={isLoadedSubcategory ? subcategoryList: []} defaultValue= {"Select Subcategory"} ></AddProductDropDown>

/*

<Grid container justifyContent="center">

          <TextField
            id="catName"
            label="New Category Name"
            name="catName"
            fullWidth
            sx={{ padding: (1, 1, 1, 1) }}
          />
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            Add Product Images
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
              console.log(event.target.files[0]);
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
            <Typography sx={{ color: "black" }}>Add New Product</Typography>
          </Button>
        </Box>


        */
