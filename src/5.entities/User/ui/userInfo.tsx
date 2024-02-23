import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { IUserItem } from "../types";
import { useCallback, useMemo, useState } from "react";
import { formatCardNumber, useAppStore } from "../../../6.shared";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import dateFormat from "dateformat";
import { teal } from "@mui/material/colors";
import { useUsersHook } from "../hooks/users.hook";

type TComponent = {
  user: IUserItem;
};

const paperStyles = {
  bgcolor: "black",
  p: 2,
  borderRadius: 2,
  display: "flex",
  gap: 1,
};

export const UserInfo = ({ user }: TComponent) => {
  const { setInfo } = useAppStore();

  const { updateScores } = useUsersHook();

  const cardNumber = useMemo(
    () =>
      user && user.score.card
        ? formatCardNumber(user.score.card)
        : "0000 0000 0000 0000",
    [user]
  );

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cardNumber);
    setInfo("Copied to clipboard");
  }, [cardNumber]);

  const [verified, setVerified] = useState(String(user.score.verified));
  const [penalty, setPenalty] = useState(String(user.score.penalty));
  const [mock, setMock] = useState(String(user.score.mock_cheating));
  const [publicCount, setPublic] = useState(String(user.score.public_cheating));

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") updateScores();
  };

  const handleClick = () => updateScores();

  return (
    <Paper elevation={1} sx={{ bgcolor: "#1b1b1b", p: 4, borderRadius: 5 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box
            height="32px"
            width="15px"
            sx={{ background: teal[700], borderRadius: 3 }}
          ></Box>
          <Typography variant="h6">User information</Typography>
        </Box>

        <Button
          variant="contained"
          sx={{ bgcolor: "background.default", px: 4 }}
          onClick={handleClick}
        >
          Save
        </Button>
      </Box>
      <Grid container>
        <Grid item xs={3} container gap={2}>
          <Grid item>
            <Avatar sx={{ height: 70, width: 70 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={1}
          >
            <Typography>
              {user.first_name} {user.last_name}
            </Typography>
            <Typography>{user.username}</Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={3}
          px={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={1}
        >
          <Typography color="GrayText" variant="body2">
            Phone number
          </Typography>
          <Typography>{user.score.phone || "null"}</Typography>
        </Grid>

        <Grid
          item
          xs={3}
          px={2}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          gap={1}
        >
          <Typography color="GrayText" px={1} variant="body2">
            Card number
          </Typography>
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
                width: "fit-content",
              }}
              onClick={copy}
            >
              {cardNumber}
            </Box>
          </Tooltip>
        </Grid>

        <Grid
          item
          xs={3}
          px={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={1}
        >
          <Typography color="GrayText" variant="body2">
            {"About"}
          </Typography>
          <Typography>{user.score.about || "info"}</Typography>
        </Grid>
      </Grid>
      <Grid container pt={3}>
        <Grid container item xs={6}>
          <Grid item xs={3} pr={1}>
            <Paper elevation={0} sx={paperStyles}>
              <Typography fontSize="small" color="GrayText" variant="body2">
                Collected:
              </Typography>
              <Typography fontSize="small" color="ghostwhite" variant="body2">
                {user.score.collected}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Tooltip title="Click on the number to change" arrow>
              <Paper elevation={0} sx={{ ...paperStyles, display: "flex" }}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Verified:
                </Typography>
                <input
                  value={verified}
                  onChange={(e) => setVerified(e.target.value)}
                  className="scoreInput"
                  onKeyUp={handleKeyUp}
                />
              </Paper>
            </Tooltip>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Tooltip title="Click on the number to change" arrow>
              <Paper elevation={0} sx={paperStyles}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Penalty:
                </Typography>
                <input
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  className="scoreInput"
                  onKeyUp={handleKeyUp}
                />
              </Paper>
            </Tooltip>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Paper elevation={0} sx={paperStyles}>
              <Typography fontSize="small" color="GrayText" variant="body2">
                Paid:
              </Typography>
              <Typography fontSize="small" color="ghostwhite" variant="body2">
                {user.score.paid}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container item xs={6}>
          <Grid item xs={3} pr={1}>
            <Tooltip title="Click on the number to change" arrow>
              <Paper elevation={0} sx={paperStyles}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Mock:
                </Typography>
                <input
                  value={mock}
                  onChange={(e) => setMock(e.target.value)}
                  className="scoreInput"
                  onKeyUp={handleKeyUp}
                />
              </Paper>
            </Tooltip>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Tooltip title="Click on the number to change" arrow>
              <Paper elevation={0} sx={paperStyles}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Public:
                </Typography>
                <input
                  value={publicCount}
                  onChange={(e) => setPublic(e.target.value)}
                  className="scoreInput"
                  onKeyUp={handleKeyUp}
                />
              </Paper>
            </Tooltip>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Paper elevation={0} sx={paperStyles}>
              <Typography fontSize="small" color="GrayText" variant="body2">
                Joined:
              </Typography>
              <Typography fontSize="small" color="ghostwhite" variant="body2">
                {dateFormat(user.score.public_cheating, "mm.dd.yy")}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Button
              startIcon={<BlockIcon />}
              size="small"
              variant="contained"
              sx={{
                width: "100%",
                height: "100%",
                ...paperStyles,
                p: 0,
              }}
            >
              Block
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
