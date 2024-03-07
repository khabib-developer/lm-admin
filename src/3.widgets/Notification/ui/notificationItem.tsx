import { Alert, Box, Typography } from "@mui/material";
import {
  ChatRoutes,
  INotification,
  MessageTypes,
  PaymentRoutes,
  SentenceRoutes,
} from "../../../6.shared";
import dateformat from "dateformat";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IMessage, useChatStore } from "../../../5.entities";

interface IProps {
  notification: INotification;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NotificationItem = (props: IProps) => {
  const navigate = useNavigate();

  const { setUserId } = useChatStore();

  const datetime = useMemo(() => {
    const date = new Date();
    if (
      dateformat(props.notification.created_at, "dd.mm.yyyy") !==
      dateformat(date, "dd.mm.yyyy")
    )
      return dateformat(props.notification.created_at, "dd.mm.yyyy");
    return dateformat(props.notification.created_at, "hh:mm");
  }, [props.notification]);

  const handleClick = () => {
    if (
      props.notification.type === MessageTypes.message ||
      props.notification.type === MessageTypes.appeal
    ) {
      const notification = props.notification as INotification<IMessage>;
      navigate(ChatRoutes.main);
      setUserId(notification.value.sender);
    } else if (props.notification.type === MessageTypes.transaction) {
      navigate(PaymentRoutes.main.replace(":offset", "1"));
    } else if (props.notification.type === MessageTypes.proper_nouns) {
      navigate(
        `${SentenceRoutes.has_proper_noun.replace(":offset", "1")}?${
          props.notification.value.id
        }`
      );
    }
    props.setOpen(false);
  };

  const severity = useMemo(() => {
    const info = "info";
    const error = "error";
    const warning = "warning";
    return props.notification.type === MessageTypes.appeal
      ? error
      : props.notification.type === MessageTypes.proper_nouns
      ? warning
      : info;
  }, [props.notification.type]);

  return (
    <Alert
      severity={severity}
      variant="filled"
      icon={false}
      sx={{
        mb: 2,
        cursor: "pointer",
        color: "white",
      }}
      onClick={handleClick}
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
