import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material";
import themeOptions from "../style/theme";

import { RecoilRoot } from "recoil";

const SignIn = () => {
  function addHoursToDate(date, hours) {
    return new Date(new Date(date).setHours(date.getHours() + hours));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await axios
      .post(
        "http://164.92.208.145/api/v1/auth/login",
        new URLSearchParams({
          username: data.get("email"),
          password: data.get("password"),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(async (response) => {
        let myDate = new Date();
        let expiration = addHoursToDate(myDate, 60);
        document.cookie = `isLogged=${true}; expires=${expiration}`;
        document.cookie = `name=${data.get("email")}; expires=${expiration}`;
        document.cookie = `access_token=${response.data.access_token}; expires=${expiration}`;
        await axios
          .get("http://164.92.208.145/api/v1/users/", {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${response.data.access_token}`,
            },
          })
          .then((userResponse) => {
            document.cookie = `user_type=${userResponse.data.data.user_type}; expires=${expiration}`;
            window.location.href = "http://localhost:3000";
          });
        //window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert("Wrong Registration");

        window.location.href = "http://localhost:3000/SignIn";
      });
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={themeOptions}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "orange" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <nav>
                    <Link href="/forgetPassword" variant="body2">
                      Forgot password?
                    </Link>
                  </nav>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  );
};
export default SignIn;
