import { Alert } from "@mui/material";
import { INotification } from "../../../6.shared";

interface IProps {
  notification: INotification;
}

export const NotificationItem = (props: IProps) => {
  return (
    <Alert severity="info" icon={false} sx={{ mb: 2, cursor: "pointer" }}>
      {props.notification.title}
    </Alert>
  );
};
