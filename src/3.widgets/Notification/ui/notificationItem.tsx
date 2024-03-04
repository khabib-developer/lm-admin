import { Alert, Box, Typography } from "@mui/material";
import { INotification } from "../../../6.shared";
import dateformat from "dateformat";
import { useMemo } from "react";

interface IProps {
  notification: INotification;
}

export const NotificationItem = (props: IProps) => {
  const datetime = useMemo(() => {
    const date = new Date();

    if (
      dateformat(props.notification.created_at, "dd.mm.yyyy") !==
      dateformat(date, "dd.mm.yyyy")
    )
      return dateformat(props.notification.created_at, "dd.mm.yyyy");
    return dateformat(props.notification.created_at, "hh:mm");
  }, [props.notification]);

  return (
    <Alert
      severity="info"
      variant="filled"
      icon={false}
      sx={{ mb: 2, cursor: "pointer", color: "white" }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" fontSize="small">
          {props.notification.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }} fontSize="8px">
          {datetime}
        </Typography>
      </Box>
    </Alert>
  );
};
