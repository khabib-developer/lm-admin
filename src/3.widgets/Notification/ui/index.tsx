import { Badge, Box, Drawer, IconButton } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useState } from "react";
import { useAppStore } from "../../../6.shared";
import { NotificationList } from "./notificationList";
export const Notification = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { notifications } = useAppStore();
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <CircleNotificationsIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box
          height="100vh"
          sx={{ bgcolor: "background.default", overflowY: "auto" }}
          p={4}
        >
          <NotificationList />
        </Box>
      </Drawer>
    </>
  );
};
