import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import SmallShopCard from "../card/smallShopCard/SmallShopCard";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { getCookie, loggedState } from "../recoils/atoms";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { nameState } from "../recoils/atoms";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { Link } from "react-router-dom";
const user_type = getCookie("user_type");

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.main, 0.3),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [filter, setFilter] = React.useState(-1);
  //const [search, setSearch] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isLogged, setIsLogged] = useRecoilState(loggedState);
  const [isAdmin, setIsAdmin] = useRecoilState(nameState);

  const [open, setOpen] = React.useState(false);

  const handleClickBasket = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAwayBasket = (e) => {
    if ("basket-button" !== e.path[2].id) {
      setOpen(false);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Stack direction="column">
        <Link
          to="/update-information"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            fullWidth
            sx={{
              display: "block",
              padding: (1, 1, 1, 1),
              mb: 0,
            }}
          >
            <Typography sx={{ color: "black" }}>My Account</Typography>
          </Button>
        </Link>
        <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>
          <Button
            fullWidth
            sx={{
              display: "block",
              padding: (1, 1, 1, 1),
              mb: 0,
            }}
          >
            <Typography sx={{ color: "black" }}>Orders</Typography>
          </Button>
        </Link>
        <Link to="/coupons" style={{ textDecoration: "none", color: "black" }}>
          <Button
            fullWidth
            sx={{
              display: "block",
              padding: (1, 1, 1, 1),
              mb: 0,
            }}
          >
            <Typography sx={{ color: "black" }}>Coupons</Typography>
          </Button>
        </Link>
        <Link
          to="/update-payment"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            fullWidth
            sx={{
              display: "block",
              padding: (1, 1, 1, 1),
              mb: 0,
            }}
          >
            <Typography sx={{ color: "black" }}>Payment</Typography>
          </Button>
        </Link>
        <Link
          to="/update-address"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            fullWidth
            sx={{
              display: "block",
              padding: (1, 1, 1, 1),
              mb: 0,
            }}
          >
            <Typography sx={{ color: "black" }}>Address</Typography>
          </Button>
        </Link>
        <Link
          to="/update-favorites"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            fullWidth
            sx={{
              display: "block",
              padding: (1, 1, 1, 1),
              mb: 0,
            }}
          >
            <Typography sx={{ color: "black" }}>Favorites</Typography>
          </Button>
        </Link>
        <Button
          fullWidth
          sx={{
            display: "block",
            padding: (1, 1, 1, 1),
            mb: 0,
            justify: "center",
          }}
          onClick={() => {
            let tm = false;
            document.cookie = `isLogged=${tm}`;
            console.log(document.cookie);
            document.cookie = "name=empty";
            document.cookie = "access_token=empty";
            document.cookie = "user_type=empty";
            setIsLogged(tm);
            setIsAdmin(tm);
            window.location.href = "http://localhost:3000";
          }}
        >
          <Typography sx={{ color: "black" }}>Sign Out</Typography>
        </Button>
      </Stack>
    </Menu>
  );
  const renderMenu2 = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <nav>
        <Stack direction="column">
          <Link to="/SignIn" style={{ textDecoration: "none", color: "black" }}>
            <Button
              fullWidth
              sx={{
                display: "block",
                padding: (1, 1, 1, 1),
                mb: 1,
                justify: "center",
              }}
            >
              <Typography sx={{ color: "black" }}>Sign In</Typography>
            </Button>
          </Link>

          <Link to="/SignUp" style={{ textDecoration: "none", color: "black" }}>
            <Button
              fullWidth
              sx={{
                display: "block",
                padding: (1, 1, 1, 1),
                mb: 1,
                justify: "center",
              }}
            >
              <Typography sx={{ color: "black" }}>Create Account</Typography>
            </Button>
          </Link>
        </Stack>
      </nav>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <Link to="/update-favorites" style={{ textDecoration: "none", color: "black" }}>
          <Button
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </Button>
        </Link>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <Link to="/Dummy" style={{ textDecoration: "none", color: "black" }}>
          <Button size="large" color="inherit">
            <Badge badgeContent={17} color="primary">
              <FavoriteOutlinedIcon />
            </Badge>
          </Button>
        </Link>
        <p>Favourites</p>
      </MenuItem>
      <MenuItem>
        <Link to="/Basket" style={{ textDecoration: "none", color: "black" }}>
          <Button size="large" color="inherit">
            <Badge color="primary">
              <ShoppingBasketOutlinedIcon />
            </Badge>
          </Button>
        </Link>
        <p>Basket</p>
      </MenuItem>
      {user_type == "ADMIN" && (
        <MenuItem>
          <Link to="/Basket" style={{ textDecoration: "none", color: "black" }}>
            <Button size="large" color="inherit">
              <Badge color="primary">
                <AdminPanelSettingsIcon />
              </Badge>
            </Button>
          </Link>
          <p>Admin Panel</p>
        </MenuItem>
      )}
    </Menu>
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("enter pressed");
      console.log(event.target.value);
      window.location.href =
        "http://localhost:3000/search?search=" + event.target.value;
    }
  };

  return (
    <AppBar position="sticky" elevation={0} color="inherit">
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onKeyPress={handleKeyPress}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }}> </Box>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <Box
            component="img"
            sx={{
              height: 74,
              pt: 2,
              pb: 1,
            }}
            alt="Your logo."
            src={"/voidtureLogo.png"}
          />
        </Link>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Box
            sx={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              <Box sx={{ fontSize: 8 }}>
                <div>&nbsp;</div> Profile
              </Box>
            </Button>
          </Box>
          <Box
            sx={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link
              to="/update-favorites"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge color="primary">
                  <FavoriteOutlinedIcon />
                </Badge>
                <Box sx={{ fontSize: 8 }}>
                  <div>&nbsp;</div> Favourites
                </Box>
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link
              to="/Basket"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge color="primary">
                  <ShoppingBasketOutlinedIcon />
                </Badge>
                <Box sx={{ fontSize: 8 }}>
                  <div>&nbsp;</div> Basket
                </Box>
              </Button>
            </Link>
          </Box>
          {user_type == "PRODUCT_MANAGER" && (
            <Box
              sx={{
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link
                to="/admin-panel"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge color="primary">
                    <AdminPanelSettingsIcon />
                  </Badge>
                  <Box sx={{ fontSize: 8 }}>
                    <div>&nbsp;</div> Admin Panel
                  </Box>
                </Button>
              </Link>
            </Box>
          )}
          {user_type == "SALES_MANAGER" && (
            <Box
              sx={{
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link
                to="/salesManager"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge color="primary">
                    <AdminPanelSettingsIcon />
                  </Badge>
                  <Box sx={{ fontSize: 8 }}>
                    <div>&nbsp;</div> Admin Panel
                  </Box>
                </Button>
              </Link>
            </Box>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Button
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </Button>
        </Box>
      </Toolbar>
      {renderMobileMenu}
      {isLogged && renderMenu}
      {!isLogged && renderMenu2}
      {/*
      <ClickAwayListener onClickAway={handleClickAwayBasket}>
        <Box>
          {open && (
            <SmallShopCard
              onConfirm={handleClickBasket}
              cards={c}
              removeCard={RemoveCardHand}
            ></SmallShopCard>
          )}
        </Box>
      </ClickAwayListener>
      */}
    </AppBar>
  );
}
