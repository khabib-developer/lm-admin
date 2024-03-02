import { useCallback, useEffect, useRef } from "react";
import { MessageTypes, useAppStore } from "../../../6.shared";

const BASE_URL = `${process.env.REACT_APP_WEBSOCKET_URL}notifications/?sessionid=`;

export const useNotificationHook = () => {
  const socket = useRef<WebSocket | null>(null);

  const { setError } = useAppStore();

  const { setNotifications } = useAppStore();

  const onMessage = useCallback((event: MessageEvent) => {
    const type = JSON.parse(event.data).type;
    if (type === MessageTypes.history) {
      const message = JSON.parse(event.data);

      setNotifications(message.value);

      //   Object.keys(notificationQuantity).forEach((key) => {
      //     notificationQuantity[key as keyof IQtyNotification] =
      //       message.value.filter((m) => m.type === key).length;
      //   });

      //   setNotificationQuantities(notificationQuantity);
    } else if (type !== MessageTypes.chat) {
      // const message: TNotification<MessageTypes.appeal> = JSON.parse(
      //   event.data
      // );
      // setInfo(message.title);
    }
  }, []);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.onmessage = onMessage;

    socket.current.onclose = () => {
      setError("Internet connection is lost, please refresh your page");
    };
  }, [socket.current]);

  const connect = useCallback((cookie: string) => {
    socket.current = new WebSocket(`${BASE_URL}${cookie}`);
  }, []);

  return { connect };
};
