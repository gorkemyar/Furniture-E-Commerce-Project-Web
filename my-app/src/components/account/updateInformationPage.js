import ProfilePageContainer from "./profilePageContainer";
import { Typography, Card, Stack, Box } from "@mui/material";
import { getCookie } from "../recoils/atoms";
import { useState, useEffect } from "react";
import { getData } from "../recoils/getterFunctions";
const UpdateInformationPage = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [person, setPerson] = useState();

  useEffect(() => {
    getData("http://164.92.208.145/api/v1/users/").then((res) => {
      console.log(res.data);
      setPerson(res.data);
      setLoaded(true);
    });
  }, [isLoaded]);
  const informationWidget = (
    <Card>
      {isLoaded ? (
        <>
          <Stack direction="row">
            <Typography variant="h6">User Name:</Typography>
            <Box sx={{ m: 1 }}></Box>
            <Typography variant="body1">{person.full_name}</Typography>
          </Stack>
          <Box sx={{ m: 2 }} />
          <Stack direction="row">
            <Typography variant="h6">Email:</Typography>
            <Box sx={{ m: 1 }}></Box>
            <Typography variant="body1">{person.email}</Typography>
          </Stack>

          <Box sx={{ m: 2 }} />
          <Stack direction="row">
            <Typography variant="h6">Account Type:</Typography>
            <Box sx={{ m: 1 }}></Box>
            <Typography variant="body1">{person.user_type}</Typography>
          </Stack>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Card>
  );

  return (
    <ProfilePageContainer
      pageIndex={2}
      widget={informationWidget}
    ></ProfilePageContainer>
  );
};

export default UpdateInformationPage;
