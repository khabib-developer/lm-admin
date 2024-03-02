import { Box, Grid } from "@mui/material";
import { MessageList, TypeMessage, UserList } from "../../../5.entities";
import { SideBar } from "./chatSideBar";
import { ChatPanel } from "./chat";

export const ChatComponent = () => {
  return (
    <Grid container height="calc(100vh - 64px)">
      <SideBar />
      <ChatPanel />
    </Grid>
  );
};
