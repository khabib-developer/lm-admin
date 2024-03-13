import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { IHistory } from "../types";
import { useSentenceHook } from "../hooks/sentence.hook";
import dateFormat from "dateformat";
import { useUsersStore } from "../../User";
type THistoryItem = {
  history: IHistory;
  index: number;
};

export const HistoryItem = (props: THistoryItem) => {
  const { VisualizeErrors } = useSentenceHook();
  const { setUserId } = useUsersStore();
  const handleClick = () =>
    props.history.user.id && setUserId(props.history.user.id);
  return (
    <Box>
      <Grid container gap={4}>
        <Grid
          item
          xs={1}
          display="flex"
          flexDirection="column"
          alignItems="end"
          height={100}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 30,
              flex: "none",
              height: 30,
              borderRadius: "50%",
              background: "#000000",
            }}
          >
            {props.index}
          </Box>
          <Divider
            orientation="vertical"
            sx={{ mx: "15px", height: 60, my: "5px" }}
          />
        </Grid>
        <Grid item xs={6} display="flex" flexDirection="column">
          <Box
            height="30px"
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <Typography variant="body1" display="block">
              <u>{props.history.user.username}</u>
            </Typography>
          </Box>

          <Paper
            sx={{
              bgcolor: "background.default",
              my: 1,
              px: 3,
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            elevation={3}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: VisualizeErrors(props.history.user_text),
              }}
            />
            <Typography variant="overline">
              {dateFormat(props.history.created_at, "mmmm dS, yyyy, hh:MM")}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
