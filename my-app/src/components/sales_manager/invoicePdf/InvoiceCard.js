import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import themeOptions from "../style/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, Stack, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const InvoiceCard = (props) => {
  console.log("props", props)
  return (
    <ThemeProvider theme={themeOptions}>
      <Box disableRipple sx={{ width: 600 }}>
        <Stack direction="row" spacing={2} sx={{ }}>
         

          

          <Typography
            variant="body1"
            color="text.secondary"
            fontWeight="bold"
          >
            {props.model}: {props.title}
          </Typography>

          <Stack direction="column">
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              Price: {(props.cost - (props.cost * props.discount?? 0) / 100)}$
            </Typography>
          </Stack>

          <Box sx={{ m: 2 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
          >
            Item Count: {props.count}
          </Typography>

          <Box sx={{ m: 1 }} />
          <Stack direction="column">
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
            >
              Total Price
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
            >
              {
              (props.cost - (props.cost * props.discount?? 0) / 100) *
                props.count.toFixed(2)}
              $
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ m: 1 }} />
        <Divider />
      </Box>
    </ThemeProvider>
  );
};
export default InvoiceCard;
