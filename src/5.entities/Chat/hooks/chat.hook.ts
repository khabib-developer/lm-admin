/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef } from "react";
import { MessageTypes, useAppStore } from "../../../6.shared";
import { useChatStore } from "../model/chat.store";
import { IMessage } from "../types";

const BASE_URL = `${process.env.REACT_APP_WEBSOCKET_URL}chat/`;

export const useChatHook = () => {
  const socket = useRef<WebSocket | null>(null);

  const { cookie, user } = useAppStore();

  const { addMessage } = useChatStore();

  const connect = useCallback(
    (username: string) => {
      if (!user) return;
      const websocketURL = `${BASE_URL}${username}/?sessionid=${cookie}`;

      socket.current = new WebSocket(websocketURL);

      socket.current.onopen = () => {
        // console.log("opened");
      };
      socket.current.onclose = (event) => {
        // console.log("closed");
      };
      socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (
          data.type === MessageTypes.chat ||
          data.type === MessageTypes.appeal_answer ||
          data.type === MessageTypes.appeal
        ) {
          const message = data.message as IMessage;
          const userId = message.sender === user.id ? 0 : message.sender;

          addMessage(userId, message);
        }
      };
    },
    [cookie, user]
  );

  const disconnect = useCallback(() => {
    if (!socket.current) {
      return;
    }
    socket.current?.close();
  }, []);

  const sendMessage = useCallback(
    (message: any, type: string = "chat_message") => {
      const data = JSON.stringify({ type, message });
      socket.current?.send(data);
    },
    [socket, socket.current]
  );

  return { sendMessage, connect, disconnect };
};
