import { useCallback, useEffect, useRef } from "react";
import { INotification, MessageTypes, useAppStore } from "../../../6.shared";
import { IMessage } from "../../../5.entities/Chat/types";
import { useChatHook } from "../../../4.features";

const BASE_URL = `${process.env.REACT_APP_WEBSOCKET_URL}notifications/?sessionid=`;

export const useNotificationHook = () => {
  const socket = useRef<WebSocket | null>(null);

  const { setError, setInfo } = useAppStore();

  const { setNotifications, addNotification } = useAppStore();

  const { updateUsersList } = useChatHook();

  const onMessage = useCallback(
    (event: MessageEvent) => {
      const type = JSON.parse(event.data).type;
      console.log(JSON.parse(event.data));

      if (type === MessageTypes.history) {
        const message = JSON.parse(event.data);

        setNotifications(message.value);
      } else if (type === MessageTypes.message) {
        const message: INotification<IMessage> = JSON.parse(event.data).value;
        setInfo(message.title);
        updateUsersList(message.value.sender);
        addNotification(message);
      }
    },
    [updateUsersList]
  );

  useEffect(() => {
    if (!socket.current) return;
    socket.current.onmessage = onMessage;
    socket.current.onopen = () => {
      console.log("opened notification");
    };

    socket.current.onclose = () => {
      setError("Internet connection is lost, please refresh your page");
    };
  }, [socket.current]);

  const connect = useCallback((cookie: string) => {
    socket.current = new WebSocket(`${BASE_URL}${cookie}`);
  }, []);

  return { connect };
};
