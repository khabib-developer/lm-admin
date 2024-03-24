import { Grid, Paper } from "@mui/material";
import { IUser } from "../types";
import { formatPhoneNumber } from "../../../6.shared";
import { useUsersStore } from "../model/users.store";
import { useMemo } from "react";
import { CardNumber } from "./cardNumber";
interface IComponent {
  user: IUser;
}
export const UserItem = (props: IComponent) => {
  const { setUserId } = useUsersStore();
  const handleClick = () => setUserId(props.user.id);

  const phoneNumber = useMemo(
    () => props.user.phone && formatPhoneNumber(props.user.phone),
    [props.user]
  );
  return (
    <Paper
      sx={{
        bgcolor: "background.default",
        p: 3,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "small",
      }}
    >
      <Grid container>
        <Grid item xs={3} container>
          <Grid
            item
            xs={6}
            textAlign="start"
            p={1}
            onClick={handleClick}
            sx={{ cursor: "pointer" }}
          >
            {props.user.first_name} {props.user.last_name}
          </Grid>
          <Grid item xs={6} textAlign="center" p={1}>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Grid item xs={6} textAlign="center" p={1}>
            {props.user.mock_cheating}
          </Grid>
          <Grid item xs={6} textAlign="center" p={1}>
            {props.user.public_cheating}
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Grid item xs={6} textAlign="center">
            <CardNumber card={props.user.card} />
          </Grid>
          <Grid item xs={6} textAlign="center" p={1}>
            {props.user.paid}
          </Grid>
        </Grid>
        <Grid item xs={3} container>
          <Grid item xs={6} textAlign="center" p={1}>
            {props.user.verified}
          </Grid>
          <Grid item xs={6} textAlign="center" p={1}>
            {props.user.collected}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
