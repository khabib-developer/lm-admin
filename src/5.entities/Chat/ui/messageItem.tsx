import { Box, Paper, Typography } from "@mui/material";
import { IMessage } from "../types";
import { useAppStore } from "../../../6.shared";
import dateformat from "dateformat";

interface IComponent {
  message: IMessage;
}

export const MessageItem = (props: IComponent) => {
  const { user } = useAppStore();

  return (
    <Box
      display="flex"
      alignItems={props.message.sender === user?.id ? "end" : "start"}
      width="100%"
      flexDirection="column"
    >
      <Paper
        sx={{
          bgcolor: "background.default",
          px: 2,
          py: 1,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography>{props.message.message}</Typography>
        <Typography variant="caption" fontSize="8px" color="GrayText">
          {dateformat(props.message.timestamp, "hh:mm")}
        </Typography>
      </Paper>
    </Box>
  );
};
