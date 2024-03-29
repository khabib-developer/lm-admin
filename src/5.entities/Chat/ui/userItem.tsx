import { Avatar, Box, Grid, ListItemButton, Typography } from "@mui/material";
import { IUserChat } from "../types";
import MailIcon from "@mui/icons-material/Mail";
import { useChatStore } from "../model/chat.store";
import { useMemo } from "react";
import dateformat from "dateformat";
import { MessageTypes, useAppStore } from "../../../6.shared";

interface IComponent {
  user: IUserChat;
}

export const UserItem = (props: IComponent) => {
  const { userId, setUserId, setPermission } = useChatStore();

  const { notifications } = useAppStore();
  const handleClick = () => {
    if (userId === props.user.id) return;
    setPermission(false);
    setUserId(props.user.id);
  };
  const lastMessage = useMemo(() => {
    const message = props.user.messages[props.user.messages.length - 1];
    let time = dateformat(message.timestamp, "dd.mm.yyyy");
    if (time === dateformat(new Date(), "dd.mm.yyyy"))
      time = dateformat(message.timestamp, "hh:mm");
    let text =
      message.message.length > 24
        ? message.message.slice(0, 24) + " ..."
        : message.message;
    return { text, time };
  }, [props.user.messages]);

  const unSeenMessageCount = useMemo(
    () =>
      notifications.filter(
        (n) =>
          (n.type === MessageTypes.message || n.type === MessageTypes.appeal) &&
          +n.value.sender === +props.user.id
      ).length,
    [notifications, props.user]
  );
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
          <Box display="flex" justifyContent="space-between" pt={1}>
            <Typography
              sx={{ maxWidth: "80%", height: "20px", overflow: "hidden" }}
              variant="body2"
            >
              {lastMessage.text}
            </Typography>
            {unSeenMessageCount ? (
              <Box
                width="18px"
                height="18px"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="10px"
                sx={{ background: "red" }}
              >
                {unSeenMessageCount}
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};
