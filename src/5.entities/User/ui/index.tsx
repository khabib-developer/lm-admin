import { Box, Grid, Paper, Tooltip } from "@mui/material";
import { IUser } from "../types";
import {
  formatCardNumber,
  formatPhoneNumber,
  useAppStore,
} from "../../../6.shared";
import { useUsersStore } from "../model/users.store";
import Zoom from "@mui/material/Zoom";
import { useMemo } from "react";
interface IComponent {
  user: IUser;
}
export const UserItem = (props: IComponent) => {
  const { setUserId } = useUsersStore();
  const handleClick = () => setUserId(props.user.id);
  const { setInfo } = useAppStore();
  const cardNumber = useMemo(
    () =>
      props.user.card
        ? formatCardNumber(props.user.card)
        : "0000 0000 0000 0000",
    [props.user]
  );
  const phoneNumber = useMemo(
    () => props.user.phone && formatPhoneNumber(props.user.phone),
    [props.user]
  );
  const copy = () => {
    navigator.clipboard.writeText(cardNumber);
    setInfo("Copied to clipboard");
  };
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
            <Tooltip
              TransitionComponent={Zoom}
              title="Click to copy"
              followCursor
              leaveDelay={200}
              placement="top"
            >
              <Box
                sx={{
                  bgcolor: "background.default",
                  p: 1,
                  borderRadius: 2,
                  color: "#788a82",
                  cursor: "pointer",
                  fontSize: "small",
                }}
                onClick={copy}
              >
                {cardNumber}
              </Box>
            </Tooltip>
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
