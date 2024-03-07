import { Box, Typography } from "@mui/material";
import { useAppStore } from "../../../6.shared";
import { NotificationItem } from "./notificationItem";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NotificationList = (props: IProps) => {
  const { notifications } = useAppStore();

  return (
    <Box>
      {notifications.length ? (
        notifications.map((notification) => (
          <NotificationItem
            setOpen={props.setOpen}
            key={notification.id}
            notification={notification}
          />
        ))
      ) : (
        <Typography textAlign="center">Notifications is empty</Typography>
      )}
    </Box>
  );
};
