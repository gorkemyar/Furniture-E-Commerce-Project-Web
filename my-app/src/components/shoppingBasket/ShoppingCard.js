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
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ShoppingCard = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [outStock, setoutStock] = React.useState(false);
  const [notZero, setnotzero] = React.useState(false);
  const removeHandler = () => {
    props.delete(props.id);
  };

  const decreaser = () => {
    setoutStock(false);
    if (props.count === 0) {
      setnotzero(true);
    } else {
      props.dec(props.id);
    }
  };
  const increaser = () => {
    setnotzero(false);
    if (props.count >= props.stock) {
      setoutStock(true);
    } else {
      props.inc(props.id);
    }
  };

  React.useEffect(() => {}, [outStock, notZero]);
  return (
    <ThemeProvider theme={themeOptions}>
      <Box disableRipple sx={{ width: 800 }}>
        <Stack direction="row" spacing={2} sx={{ height: "60px" }}>
          <Link
            to={`/product/${props.title}`}
            underline="none"
            state={{ id: props.id }}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <CardMedia
              component="img"
              height="100"
              width="100"
              image={props.imageId}
              alt="Voidture not Found"
            />
          </Link>
          <Stack direction="column">
            <Typography variant="body1" sx={{ fontSize: 10 }}>
              {props.title}
            </Typography>
            <Divider />
            <Typography variant="body2">{props.number}</Typography>
            <Box sx={{ m: 2 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              Price: {props.cost}$
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="bold"
            >
              Model
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              {props.model}
            </Typography>
          </Stack>
          <Box sx={{ m: 2 }} />
          <Stack direction="column">
            <Box sx={{ m: 1 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              {" "}
              Item Count
            </Typography>
            <Stack
              direction="row"
              maxHeight={30}
              alignItems="center"
              divider={
                <Divider
                  orientation="vertical"
                  sx={{
                    width: 2,
                    bgcolor: themeOptions.palette.black.main,
                    m: 0,
                    p: 0,
                  }}
                />
              }
              sx={{
                border: 2,
                borderColor: "black",
                borderRadius: 4,
                p: 0,
                m: 0,
              }}
            >
              <CardActions>
                <IconButton aria-label="share" onClick={decreaser}>
                  <RemoveIcon />
                </IconButton>
              </CardActions>

              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
                sx={{ ml: 3, mr: 3 }}
              >
                {props.count}
              </Typography>

              <CardActions>
                <IconButton aria-label="share" onClick={increaser}>
                  <AddIcon />
                </IconButton>
              </CardActions>
            </Stack>
            {notZero && (
              <Typography variant="body2" fontWeight="bold" color="red">
                *You can not go below 0!
              </Typography>
            )}
            {outStock && (
              <Typography variant="body2" fontWeight="bold" color="red">
                *Stock Limit
              </Typography>
            )}
          </Stack>
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
              sx={{ fontSize: 12 }}
            >
              {(props.cost - (props.cost * props.discount ?? 0) / 100) *
                props.count.toFixed(2)}
              $
            </Typography>
          </Stack>

          <CardActions>
            <IconButton aria-label="share" onClick={removeHandler}>
              <DeleteOutlinedIcon />
            </IconButton>
          </CardActions>
        </Stack>
        <Box sx={{ m: 8 }} />

        <Divider />
      </Box>
    </ThemeProvider>
  );
};
export default ShoppingCard;
