import React, { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { Button } from "@mui/material";
const Card = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h1>{props.description}</h1>
    </div>
  );
};
const Dummy = () => {
  const [cardData, setData] = useState([]);
  const getData = async () => {
    //const { data } = await axios.get("http://localhost:8000/customMockData/1");

    const { data } = await axios.get(
      "http://164.92.208.145/api/v1/categories/?skip=0&limit=100",
      {
        headers: {
          "Access-Control-Allow-Origin":
            "http://164.92.208.145/api/v1/categories/?skip=0&limit=100",
        },
      }
    );

    setData(data.data);
  };

  console.log(cardData);
  useEffect(() => {
    getData();
  }, []);

  /*
  const cards = cardData.map((item) => (
    <Card key={item.id} title={item.id} description={item.body}></Card>
  ));
  */

  return <div><h1>Welcome to Dummy Page</h1>
  <Button
  onClick={() => {
    var element = document.getElementById('element-to-print');
    html2pdf(element);
    console.log(element)
  }}
  >gET PDF</Button>

  <div id="element-to-print"> hellooooo</div>
  </div>;
};

export default Dummy;
