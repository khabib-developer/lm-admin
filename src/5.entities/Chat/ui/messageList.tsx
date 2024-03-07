/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import dateformat from "dateformat";
import { useChatStore } from "../model/chat.store";
import { MessageItem } from "./messageItem";
import { IMessage, IUserChat } from "../types";
import React from "react";
import { AppealItem } from "../../Appeal";

function isNewDate(currentMessage: IMessage, previosMessage: IMessage | null) {
  if (!previosMessage) {
    return true;
  }
  return (
    dateformat(currentMessage.timestamp, "dd.mm.yyyy") !==
    dateformat(previosMessage.timestamp, "dd.mm.yyyy")
  );
}

interface IProps {
  user: IUserChat;
  sendMessage(msg: string): void;
}
export const MessageList = (props: IProps) => {
  const { scrollOffsets, setScrollOffsets, setPermission, permission } =
    useChatStore();

  const wrapper = useRef<null | HTMLDivElement>(null);

  const [prevUserId, setPrevUserId] = useState(0);

  useEffect(() => {
    if (!wrapper.current) return;

    const wr = document.getElementById(`wrapper_${props.user.id}`);

    let scroll = wr ? wr.scrollHeight : 0;

    wr?.addEventListener("scroll", (event: any) => {
      scroll = event.target.scrollTop;
    });

    const timeOutId = setTimeout(() => setPermission(true), 0);
    return () => {
      clearTimeout(timeOutId);
      setScrollOffsets(props.user.id, scroll);
      setPrevUserId(props.user.id);
    };
  }, [props.user]);

  useEffect(() => {
    if (!wrapper.current) return;

    const top =
      prevUserId === props.user.id && prevUserId !== 0
        ? wrapper.current.scrollHeight
        : scrollOffsets[props.user.id]
        ? scrollOffsets[props.user.id]
        : wrapper.current.scrollHeight;

    wrapper.current.scrollTo({
      top,
    });
  }, [props.user, scrollOffsets, prevUserId]);

  return (
    <Box
      px={5}
      display="flex"
      flexDirection="column"
      overflow="auto"
      gap={1}
      height="calc(100vh - 224px)"
      ref={wrapper}
      id={`wrapper_${props.user.id}`}
      sx={{ opacity: Number(permission) }}
    >
      {props.user &&
        props.user.messages
          .sort((prev, curr) => prev.id - curr.id)
          .map((message, idx) => (
            <React.Fragment key={message.id}>
              {isNewDate(
                message,
                idx > 0 ? props.user.messages[idx - 1] : null
              ) ? (
                <Box display="flex" width="100%" justifyContent="center" pb={1}>
                  <Typography variant="caption" color="whitesmoke">
                    {dateformat(message.timestamp, "dd.mm.yyyy")}
                  </Typography>
                </Box>
              ) : null}
              {message.appeal || message.appeal_answer ? (
                <AppealItem
                  sendMessage={props.sendMessage}
                  key={message.id}
                  appeal={message}
                />
              ) : (
                <MessageItem key={message.id} message={message} />
              )}
            </React.Fragment>
          ))}
    </Box>
  );
};
