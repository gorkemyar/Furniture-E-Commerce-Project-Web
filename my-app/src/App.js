import ResponsiveAppBar from "./components/header/AppBarUnder";
import PrimarySearchAppBar from "./components/header/AppBar";
import themeOptions from "./components/style/theme";
import { ThemeProvider } from "@emotion/react";
import Footer from "./components/footer/Footer";
import CategoryCardHandler from "./components/card/mediaMiddle/CategoryCardHandler";
import { Card } from "@mui/material";
import MediaCard from "./components/card/mediaTop/MediaCard";
import "./App.css";
import CardHalfTogether from "./components/card/mediaMiddle/CardHalfTogether";
import CardHalfReverse from "./components/card/mediaMiddle/CardHalfReverse";
import CardItemHandler from "./components/card/mediaMiddle/CardItemHandler";
import MediaCardStyled from "./components/card/mediaTop/MediaCardStyled";
import { useEffect, useState } from "react";
import { getData } from "./components/recoils/getterFunctions";

import { RecoilRoot } from "recoil";

export default function App() {
  //console.log(document.cookie);

  const [cards, setCards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getData("http://164.92.208.145/api/v1/categories/").then((res) => {
      setCards(res.data);
      setIsLoaded(true);
    });
  }, [isLoaded]);

  return (
    <RecoilRoot>
      <ThemeProvider theme={themeOptions}>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <ResponsiveAppBar></ResponsiveAppBar>
        <MediaCardStyled></MediaCardStyled>
        {isLoaded ? (
          <CategoryCardHandler item={cards}></CategoryCardHandler>
        ) : (
          <div></div>
        )}
        <CardHalfReverse></CardHalfReverse>

        <Card
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
          }}
        >
          <MediaCard myId={4}></MediaCard>
        </Card>
        {
          //<CardItemHandler item={cards2}></CardItemHandler>
          // Get it back with mainPage EndPoints
        }
        <CardHalfTogether></CardHalfTogether>
        <Footer />
      </ThemeProvider>
    </RecoilRoot>
  );
}
