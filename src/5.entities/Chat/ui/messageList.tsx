import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import dateformat from "dateformat";
import { useChatStore } from "../model/chat.store";
import { MessageItem } from "./messageItem";
import { IMessage, IUserChat } from "../types";
import React from "react";

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
}

export const MessageList = (props: IProps) => {
  const { scrollOffsets, setScrollOffsets } = useChatStore();

  const wrapper = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) return;

    const wr = document.getElementById(`wrapper_${props.user.id}`);

    let scroll = wr ? wr.scrollHeight : 0;

    wr?.addEventListener("scroll", (event: any) => {
      scroll = event.target.scrollTop;
    });

    return () => {
      setScrollOffsets(props.user.id, scroll);
    };
  }, [props.user]);

  useEffect(() => {
    if (!wrapper.current) return;
    wrapper.current.scrollTo({
      top: scrollOffsets[props.user.id]
        ? scrollOffsets[props.user.id]
        : wrapper.current.scrollHeight,
    });
  }, [props.user, scrollOffsets]);

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
              <MessageItem key={message.id} message={message} />
            </React.Fragment>
          ))}
    </Box>
  );
};
