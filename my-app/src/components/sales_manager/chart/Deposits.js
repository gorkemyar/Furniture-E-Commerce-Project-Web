import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Deposits(props) {
  return (
    <React.Fragment>
      <Typography component="p" variant="h4">
        Last Purchase:
      </Typography>
      <Typography component="p" variant="h6">
        Profit: {props.data.price}$
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {props.data.createdAt}
      </Typography>
    </React.Fragment>
  );
}
