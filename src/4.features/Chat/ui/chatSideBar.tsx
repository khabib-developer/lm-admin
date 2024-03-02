import { Grid } from "@mui/material";
import { SearchUser, UserList } from "../../../5.entities";

export const SideBar = () => {
  return (
    <Grid item xs={3}>
      <SearchUser />
      <UserList />
    </Grid>
  );
};
