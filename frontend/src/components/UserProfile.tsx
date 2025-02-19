import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

type Props = {
  data: User;
};

function UserProfile(props: Props) {
  const { name, email, role } = props.data;
  return (
    <Box>
      <Card sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
        <CardContent>
          <Box>
            <Box display="flex" alignItems="center">
              <Avatar alt={name} sizes="large" sx={{ width: 100, height: 100 }}>
                {name}
              </Avatar>
              <Box ml={3}>
                <Typography variant="h5" fontWeight="bold">
                  {name}{" "}
                  <Typography
                    textTransform="lowercase"
                    variant="subtitle1"
                    component="span"
                  >
                    ({role})
                  </Typography>
                </Typography>
                <Typography>{email}</Typography>
              </Box>
            </Box>
            {/* <Box ml="110px">
              <FormLabel>
                <Switch checked={active} /> Active
              </FormLabel>
            </Box> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserProfile;
