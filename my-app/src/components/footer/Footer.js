import { Container, Grid, Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 3, sm: 5 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Register
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ fontWeight: "bold" }} borderBottom={1}>
                Get in Touch
              </Box>
              <Box
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Address: <div>&nbsp;</div>
                <Box sx={{ fontWeight: "normal" }}>
                  {" "}
                  <Link
                    href="https://www.google.com/maps/search/Orta+Mahalle,+%C3%9Cniversite+Caddesi+No:27+Tuzla,+34956+%C4%B0stanbul/@40.8917534,29.3830913,14z/data=!3m1!4b1"
                    color="inherit"
                  >
                    Sabanci University
                  </Link>
                </Box>
              </Box>
              <Box
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Telephone Enquiry:<div>&nbsp;</div>
                <Box sx={{fontWeight: "normal"}}>+905353323835</Box>
              </Box>
              <Box
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Email:<div>&nbsp;</div>
                <Box sx={{ fontWeight: "normal" }}> demo@gmail.com</Box>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Voidture &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
