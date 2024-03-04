import { Box, Typography } from "@mui/material";
import { useAppStore } from "../../../6.shared";
import { NotificationItem } from "./notificationItem";

export const NotificationList = () => {
  const { notifications } = useAppStore();

  return (
    <Box>
      {notifications.length ? (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      ) : (
        <Typography textAlign="center">Notifications is empty</Typography>
      )}
    </Box>
  );
};
