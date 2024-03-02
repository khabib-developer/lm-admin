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

export const ChatPanel = () => {
  const { userId, userList } = useChatStore();
  const { connect, disconnect, sendMessage } = useChatHook();

  const user = useMemo(
    () => (userId ? userList.find((user) => user.id === userId) : null),
    [userId, userList]
  );

  useEffect(() => {
    if (!userId) {
      return;
    }
    const username = userList.find((u) => u.id === userId)?.username;
    if (!username) {
      return;
    }

    connect(username);

    return disconnect;
  }, [userId, userList]);

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
          <MessageList user={user} />
          <TypeMessage sendMessage={sendMessage} />
        </Box>
      ) : (
        <DefaultViewOfChat />
      )}
    </Grid>
  );
};
