import { Avatar, Box, Grid, ListItemButton, Typography } from "@mui/material";
import { IUserChat } from "../types";
import MailIcon from "@mui/icons-material/Mail";
import { useChatStore } from "../model/chat.store";
import { useCallback, useMemo } from "react";
import dateformat from "dateformat";

interface IComponent {
  user: IUserChat;
}

export const UserItem = (props: IComponent) => {
  const { userId, setUserId } = useChatStore();
  const handleClick = () => {
    setUserId(props.user.id);
  };
  const lastMessage = useMemo(() => {
    const message = props.user.messages[props.user.messages.length - 1];
    let time = dateformat(message.timestamp, "dd.mm.yyyy");
    if (time === dateformat(new Date(), "dd.mm.yyyy"))
      time = dateformat(message.timestamp, "hh:mm");
    let text = message.message;
    return { text, time };
  }, []);
  return (
    <ListItemButton
      sx={{ background: props.user.id === userId ? "#303030" : "inherit" }}
      onClick={handleClick}
    >
      <Grid container px={2} py={1}>
        <Grid
          item
          xs={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Avatar>
            <MailIcon />
          </Avatar>
        </Grid>
        <Grid
          xs={10}
          item
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">
              {props.user.first_name} {props.user.last_name}
            </Typography>
            <Typography variant="caption">{lastMessage.time}</Typography>
          </Box>
          <Typography
            sx={{ maxWidth: "100%", height: "20px", overflow: "hidden" }}
            variant="body2"
          >
            {lastMessage.text}
          </Typography>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};
