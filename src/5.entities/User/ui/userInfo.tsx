import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { IUserItem } from "../types";
import { useEffect, useState } from "react";
import { formatPhoneNumber, formattedNumber } from "../../../6.shared";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import dateFormat from "dateformat";
import { teal } from "@mui/material/colors";
import { useUsersHook } from "../hooks/users.hook";
import { CardNumber } from "./cardNumber";

type TComponent = {
  user: IUserItem;
  setUser: React.Dispatch<React.SetStateAction<IUserItem | null>>;
};

const paperStyles = {
  bgcolor: "black",
  p: 2,
  borderRadius: 2,
  display: "flex",
  gap: 1,
  overflow: "hidden",
};

export const UserInfo = ({ user, setUser }: TComponent) => {
  const { updateScores, changeUserAccess } = useUsersHook();

  const [isActive, setIsActive] = useState(user.score.blocked);

  const [verified, setVerified] = useState(user.score.verified);
  const [penalty, setPenalty] = useState(user.score.penalty);
  const [mock, setMock] = useState(String(user.score.mock_cheating));
  const [publicCount, setPublic] = useState(String(user.score.public_cheating));

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      const score = await updateScores(
        user.score.id,
        verified,
        penalty,
        +mock,
        +publicCount
      );
      if (score) setUser({ ...user, score });
    }
  };

  useEffect(() => {
    if (user) {
      setVerified(user.score.verified);
      setPenalty(user.score.penalty);
      setMock(String(user.score.mock_cheating));
      setPublic(String(user.score.public_cheating));
      setIsActive(user.score.is_active);
    }
  }, [user]);

  const handleClick = async () => {
    const score = await updateScores(
      user.score.id,
      verified,
      penalty,
      +mock,
      +publicCount
    );
    if (score) setUser({ ...user, score });
  };

  const handleChangeScores = (verified: boolean, value: string) => {
    if (Number.isNaN(value)) return;
    if (verified) {
      setVerified(+value);
    } else if (!verified) {
      setPenalty(+value);
    }
  };

  const handleBlock = () => {
    changeUserAccess(user.score.id, !isActive);
    setIsActive((prev) => !prev);
  };

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
          <Typography variant="h6">User information:</Typography>
          <a href={`malto:${user.email}`}>{user.email}</a>
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
            <Typography color={user.score.blocked ? "error" : "inherit"}>
              {user.first_name} {user.last_name}
            </Typography>
            <Typography>@{user.username}</Typography>
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
          <Typography>
            {formatPhoneNumber(String(user.score.phone)) || "null"}
          </Typography>
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

          <CardNumber card={user.score.card} />
        </Grid>

        <Grid
          item
          xs={3}
          px={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={1}
          overflow="hidden"
        >
          <Typography color="GrayText" variant="body2">
            {"About"}
          </Typography>
          <Tooltip arrow title={user.score.about}>
            <Typography>{user.score.about || "info"}</Typography>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container pt={3}>
        <Grid container item xs={6}>
          <Grid item xs={3} pr={1}>
            <Tooltip
              title={String(formattedNumber(user.score.collected))}
              arrow
            >
              <Paper elevation={0} sx={paperStyles}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Collected:
                </Typography>
                <Typography fontSize="small" color="ghostwhite" variant="body2">
                  {user.score.collected}
                </Typography>
              </Paper>
            </Tooltip>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Tooltip
              title={`Click on the  ${formattedNumber(verified)} to change`}
              arrow
            >
              <Paper elevation={0} sx={{ ...paperStyles, display: "flex" }}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Verified:
                </Typography>
                <input
                  value={verified}
                  onChange={(e) => handleChangeScores(true, e.target.value)}
                  className="scoreInput"
                  onKeyUp={handleKeyUp}
                />
              </Paper>
            </Tooltip>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Tooltip
              title={`Click on the ${formattedNumber(penalty)} to change`}
              arrow
            >
              <Paper elevation={0} sx={paperStyles}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Penalty:
                </Typography>
                <input
                  value={penalty}
                  onChange={(e) => handleChangeScores(false, e.target.value)}
                  className="scoreInput"
                  onKeyUp={handleKeyUp}
                />
              </Paper>
            </Tooltip>
          </Grid>
          <Grid item xs={3} pr={1}>
            <Tooltip arrow title={String(formattedNumber(user.score.paid))}>
              <Paper elevation={0} sx={paperStyles}>
                <Typography fontSize="small" color="GrayText" variant="body2">
                  Paid:
                </Typography>
                <Typography fontSize="small" color="ghostwhite" variant="body2">
                  {user.score.paid}
                </Typography>
              </Paper>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid container item xs={6}>
          <Grid item xs={3} pr={1}>
            <Tooltip
              title={`Click on the ${formattedNumber(Number(mock))} to change`}
              arrow
            >
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
            <Tooltip
              title={`Click on the ${formattedNumber(
                Number(publicCount)
              )} to change`}
              arrow
            >
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
                {dateFormat(user.score.created_at, "mm.dd.yy")}
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
              onClick={handleBlock}
            >
              {!isActive ? "Unblock" : "Block"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
