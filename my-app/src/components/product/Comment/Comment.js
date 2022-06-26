import * as React from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import themeOptions from "../../style/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, Stack, Divider, Button } from "@mui/material";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { nameState } from "../../recoils/atoms";
import { useRecoilValue } from "recoil";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { getCookie } from "../../recoils/atoms";
const access = getCookie("access_token");
const CommentCard = (props) => {
  const [openComment, setOpenComment] = React.useState(false);
  const adminState = getCookie("user_type");
  const [isButton, setIsButton] = React.useState(false);
  const [littleComment, setLittleComment] = React.useState(props.comment);

  const openAllComment = () => {
    setOpenComment(true);
  };
  const closeAllComment = () => {
    setOpenComment(false);
  };

  if (props.comment.length > 300 && props.comment == littleComment) {
    setIsButton(true);
    setLittleComment(props.comment.substr(0, 300));
  }

  const commentDeleter = () => {
    axios
      .delete(
        `http://164.92.208.145/api/v1/products/${props.productId}/comments/${props.id}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${access}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const commentApprove = () => {
    axios
      .post(
        `http://164.92.208.145/api/v1/products/${props.productId}/comment/${props.id}/active`,
        {
          is_active: true,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${access}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={themeOptions}>
      <Stack direction="row">
        <Box disableRipple sx={{ width: 800 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="right"
            display="flex"
          >
            <Stack display="flex" direction="row" spacing={3}>
              <Typography
                variant="body1"
                component="legend"
                fontWeight="bold"
                fontSize={15}
              >
                {props.name}
              </Typography>
              <Rating name="read-only" value={props.topic} readOnly />
            </Stack>
            <Typography component="legend" align="left" fontSize={12}>
              {!openComment && littleComment}
              {openComment && props.comment}
              {!openComment && isButton && (
                <Button onClick={openAllComment}>...</Button>
              )}
              {openComment && isButton && (
                <Button onClick={closeAllComment}>...</Button>
              )}
            </Typography>
            <Box sx={{ m: 1 }}></Box>
          </Stack>

          <Divider />
        </Box>
        {adminState == "PRODUCT_MANAGER" && !props.isVal && (
          <>
            <Button
              onClick={() => {
                commentApprove();
              }}
            >
              <DoneIcon></DoneIcon>
            </Button>
            {/*
              <Button
                onClick={() => {
                  commentDeleter();
                }}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
              */}
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
};
export default CommentCard;
