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

const InvoiceAddress = (props) => {
  return (
    <ThemeProvider theme={themeOptions}>
      <Box disableRipple sx={{ width: 600 }}>
        <Stack direction="row" spacing={2} sx={{ }}>
          <Box sx={{ m: 2 }} />
          <Stack direction="column">
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              country: {props.country}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
          >
            {props.city}: {props.zip}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            fontWeight="bold"
          >
            {props.full_address}
          </Typography>

          <Box sx={{ m: 2 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight="bold"
          >
            {props.personal_name}
          </Typography>

          <Box sx={{ m: 1 }} />
        </Stack>
        <Box sx={{ m: 1 }} />
        <Divider />
      </Box>
    </ThemeProvider>
  );
};
export default InvoiceAddress;
