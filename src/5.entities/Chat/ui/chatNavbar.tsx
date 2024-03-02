import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useChatStore } from "../model/chat.store";
import { useMemo } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useUsersStore } from "../../User";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export const ChatNavbar = () => {
  const { userId, userList, setUserId } = useChatStore();
  const user = useMemo(
    () => (userId ? userList.find((user) => user.id === userId) : null),
    [userId, userList]
  );

  const userStore = useUsersStore();

  const handleClick = () => userId && userStore.setUserId(userId);
  const handleBack = () => setUserId(null);

  return (
    <Box p={2} px={5} mt={1} display="flex" gap={3} sx={{ bgcolor: "#303030" }}>
      <Box>
        <IconButton onClick={handleBack}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>
      <Box>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </Box>
      {user && (
        <Box
          display="flex"
          onClick={handleClick}
          flexDirection="column"
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="body2">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body2">@{user.username}</Typography>
        </Box>
      )}
    </Box>
  );
};
