import { Box, CircularProgress, Typography } from "@mui/material";
import UserProfile from "../components/UserProfile";
import { useMeQuery } from "../services/api";
import { useAppSelector } from "../store/store";

const Profile = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useMeQuery(undefined, { skip: !isAuthenticated });

  if (isLoading) {
    return (
      <Box
        width="100vw"
        padding={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        width="100vw"
        padding={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography textAlign="center">Profile not found!</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <UserProfile data={data.data} />
    </Box>
  );
};

export default Profile;
