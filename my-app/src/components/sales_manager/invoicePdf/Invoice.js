import React, { Component, PropTypes } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

import { List, ListItem, Typography, Card, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import InvoiceCard from "./InvoiceCard";
import InvoiceAddress from "./InvoiceAddress";
import { getData } from "../recoils/getterFunctions";

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
// import {html2canvas, jsPDF} from 'app/ext';

const Export = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [lastOrder, setOrder] = useState([]);

  useEffect(() => {
    getData(`http://164.92.208.145/api/v1/users/orders`)
      .then((res) => {
        setOrder(res.data[0]);
        console.log("response.data", res.data[0]);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("hellooooo");
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    var opt = {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { useCORS: true, scale: 2 ,allowTaint: true},
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(input).save();


  };

  let totalCost = 0;

  return (
    <div>
      <div id="divToPrint" className="mt4">
        {isLoaded ? (
          <>
            <List>
              {lastOrder.order_details.map(
                (card) => (
                  console.log("card", card),
                  (
                    <ListItem key={card.product.id}>
                      <InvoiceCard
                        discount={card.product.discount}
                        cost={card.product.price}
                        title={card.product.title}
                        id={card.product.id}
                        stock={card.stock}
                        count={card.quantity}
                        model={card.product.model}
                      >
                        {totalCost += (card.product.price - (card.product.price * card.product.discount?? 0) / 100) * card.quantity}
                      </InvoiceCard>
                    </ListItem>
                  )
                )
              )}
            </List>
            <InvoiceAddress
              country={lastOrder.address.country}
              zip={lastOrder.address.postal_code}
              id={lastOrder.address.id}
              city={lastOrder.address.city}
              full_address={lastOrder.address.full_address}
              personal_name={lastOrder.address.personal_name}
            ></InvoiceAddress>
            <Box disableRipple sx={{ width: 500 }}>
              <Typography sx={{ pl: 3 }}>
                Total Cost is {totalCost}$
              </Typography>
            </Box>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="mb5">
        <Button onClick={printDocument}>Get PDF</Button>
      </div>
    </div>
  );
};
export default Export;
