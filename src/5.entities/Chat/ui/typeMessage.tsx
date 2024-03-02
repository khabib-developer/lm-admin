import { Box, Input, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../model/chat.store";

interface Props {
  sendMessage(msg: string): void;
}

export const TypeMessage = ({ sendMessage }: Props) => {
  const { userId } = useChatStore();

  const [value, setValue] = useState("");

  const ref = useRef<null | HTMLDivElement>(null);
  const handleSend = () => {
    if (value.trim() !== "") {
      sendMessage(value);
      setValue("");
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
