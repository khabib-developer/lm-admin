/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Input, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef } from "react";
import { useChatStore } from "../model/chat.store";

interface Props {
  sendMessage(msg: string): void;
}

export const TypeMessage = ({ sendMessage }: Props) => {
  const { userId } = useChatStore();

  const { typedMessage, setTypedMessage } = useChatStore();

  const ref = useRef<null | HTMLDivElement>(null);
  const handleSend = () => {
    if (typedMessage.trim() !== "") {
      sendMessage(typedMessage);
      setTypedMessage("");
    }
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "NumpadEnter" || event.code === "Enter") handleSend();
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (!ref.current || !userId) return;
      (ref.current.children[0] as HTMLInputElement).focus();
    }, 0);

    return () => clearTimeout(timeId);
  }, [userId, ref.current]);

  return (
    <Box p={2} px={5} mb={1} sx={{ bgcolor: "#303030" }}>
      <Input
        ref={ref}
        id="input-with-icon-adornment"
        sx={{ width: "100%", py: 0.5 }}
        placeholder="Type a message"
        value={typedMessage}
        onChange={(e) => setTypedMessage(e.target.value)}
        onKeyUp={handleKeyUp}
        endAdornment={
          <InputAdornment
            onClick={handleSend}
            sx={{ cursor: "pointer" }}
            position="start"
          >
            <SendIcon />
          </InputAdornment>
        }
      />
    </Box>
  );
};
