import React from "react";
import { Grid, Container, Card, Box, Typography, Stack } from "@mui/material";
import SortDropDown from "../../search/sortDropDown";
import CardItemFavourite from "./cardItemFavourite";

const CardItemHandlerFavourite = (props) => {
  const data = structuredClone(props.item);
  let dataCopy = structuredClone(props.item);

  const [dynamicData, setDynamicData] = React.useState(data);
  const [changed, setChanged] = React.useState(false);

  React.useEffect(() => {
    setChanged(false);
  }, [changed]);

  const handleSort = (sort) => {
    if (sort === 0) {
      setDynamicData(dataCopy);
      console.log(dataCopy);
      console.log("sort 0");
    }

    if (sort === 1) {
      // Sort by price low to high
      data.sort((a, b) => a.price - b.price);
      setDynamicData(data);
    } else if (sort === 2) {
      // Sort by price high to low
      data.sort((a, b) => b.price - a.price);
      setDynamicData(data);
    } else if (sort === 3) {
      // Sort by popularity
      data.sort((a, b) => b.comment_count - a.comment_count);
      setDynamicData(data);
      console.log("sort 3");
    }

    setChanged(true);
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{ textAlign: "center" }}
        sx={{ mb: 2, mt: 4 }}
      >
        {props.title}
      </Typography>
      <Container maxWidth="lg" height="400">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <SortDropDown handleSort={handleSort}></SortDropDown>
            </Box>
          </Grid>

          {dynamicData.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={3}>
              <CardItemFavourite
                imageId={card.photos[0] != null ? card.photos[0].photo_url : ""}
                cost={`${card.price}$`}
                title={card.title}
                productId={card.id}
                removeFromList={() => {}}
              ></CardItemFavourite>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default CardItemHandlerFavourite;
