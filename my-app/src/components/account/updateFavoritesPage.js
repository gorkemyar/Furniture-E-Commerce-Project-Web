import React, { useEffect, useState } from "react";
import ProfilePageContainer from "./profilePageContainer";
import { ThemeProvider } from "@mui/material/styles";
import themeOptions from "../style/theme";
import PrimarySearchAppBar from "../header/AppBar";
import ResponsiveAppBar from "../header/AppBarUnder";
import Footer from "../footer/Footer";
import { Box, Typography } from "@mui/material";

import { RecoilRoot } from "recoil";
import { useSearchParams } from "react-router-dom";
import { getData } from "../recoils/getterFunctions";
import CardItemHandlerFavourite from "./card/cardItemHandlerFavourite";

const UpdateFavoritesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dynamicData, setDynamicData] = useState([]);
  useEffect(async () => {
    const tempPrdouctData = [];

    getData(`http://164.92.208.145/api/v1/users/favorites?skip=0&limit=100`)
      .then(async (res) => {
        console.log("resposensss", res);
        // for every item id in the response, get the product data from the database and then add it to the dynamicData array
        for (var i = 0; i < res.data.length; i++) {
          console.log("iddddd", res.data[i].id);
          await getData(
            `http://164.92.208.145/api/v1/products/${res.data[i].product_id}`
          ).then((res2) => {
            tempPrdouctData.push(res2.data);
          });
        }
      })
      .then(() => {
        console.log("dynamicData setted", dynamicData);
        setDynamicData(tempPrdouctData);
        setIsLoaded(true);
      });
  }, []);

  //const favouritesWidget =

  const title = "Favorites";
  console.log(dynamicData);
  console.log(isLoaded);
  return (
    <ProfilePageContainer
      pageIndex={5}
      widget={
        isLoaded ? (
          <CardItemHandlerFavourite
            item={dynamicData}
            title={title}
          ></CardItemHandlerFavourite>
        ) : (
          <Box sx={{ height: 300, mt: 10 }} justifyContent="center">
            <Typography variant="h4" align="center">
              Loading...
            </Typography>
          </Box>
        )
      }
    ></ProfilePageContainer>
  );
};

export default UpdateFavoritesPage;
