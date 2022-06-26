import * as React from "react";
import themeOptions from "../../style/theme";

import { Typography, Menu, MenuItem, Button } from "@mui/material";
export default function AddProductDropDown(props) {
  const dataList = props.dataList;
  const [buttonText, setButtonText] = React.useState(props.defaultValue);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleSelect = (event) => {
    handleClose();
    // Send the category name back to the parent component
    props.handleCategoryName(event.target.value);

    // Change the visible text on the button
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].id === event.target.value) {
        setButtonText(dataList[i].title);
        break;
      }
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        key={123123}
        id="sort-button"
        aria-controls={open ? "sort-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: themeOptions.palette.secondary.main,
          display: "block",
          padding: (8, 1, 8, 1),
          mb: 2,
          justify: "center",
          borderRadius: "0",
          pl: 4,
          pr: 4,
        }}
      >
        <Typography sx={{ color: "white" }}>{buttonText}</Typography>
      </Button>

      <Menu
        key="asda"
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
        elevation={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {dataList.map((category, index) => {
          return (
            <div style={{ display: "block" }}>
              <MenuItem
                key={`${category.title} $index`}
                onClick={handleSelect}
                value={category.id}
              >
                {category.title}
              </MenuItem>
            </div>
          );
        })}
      </Menu>
    </div>
  );
}
