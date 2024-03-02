import { Box, Input, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

interface Props {
  sendMessage(msg: string): void;
}

export const TypeMessage = ({ sendMessage }: Props) => {
  const [value, setValue] = useState("");
  const handleSend = () => {
    if (value.trim() !== "") sendMessage(value);
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "NumpadEnter" || event.code === "Enter") handleSend();
  };

  return (
    <Box p={2} px={5} mb={1} sx={{ bgcolor: "#303030" }}>
      <Input
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
