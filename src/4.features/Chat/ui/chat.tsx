/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from "@mui/material";
import {
  ChatNavbar,
  DefaultViewOfChat,
  MessageList,
  TypeMessage,
  useChatHook,
  useChatStore,
} from "../../../5.entities";
import { useEffect, useMemo } from "react";
import { useAppStore } from "../../../6.shared";

export const ChatPanel = () => {
  const { userId, userList } = useChatStore();
  const { connect, disconnect, sendMessage } = useChatHook();

  const { deleteMessageNotifications } = useAppStore();

  const user = useMemo(
    () => (userId ? userList.find((user) => user.id === userId) : null),
    [userId, userList]
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    connect(user.username);

    return disconnect;
  }, [user?.username]);

  useEffect(() => {
    if (!user) {
      return;
    }
    deleteMessageNotifications(user.id);
  }, [user?.id]);

  return (
    <Grid item xs={9} sx={{ background: "#303030" }}>
      {user ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <ChatNavbar />
          <MessageList user={user} sendMessage={sendMessage} />
          <TypeMessage sendMessage={sendMessage} />
        </Box>
      ) : (
        <DefaultViewOfChat />
      )}
    </Grid>
  );
};
