import { Box, TextField } from "@mui/material";
import { useSentenceStore } from "../model/sentence.store";
import React, { useCallback } from "react";

export const OtherWords = () => {
  const { otherWords, changeOtherWords } = useSentenceStore();

  const handleChange = useCallback((id: number, word: string) => {
    if (word.includes(" ")) return;
    changeOtherWords(id, word);
  }, []);
  return (
    <Box px={4} display="flex" flexWrap="wrap" width="50%">
      {otherWords.map((item) => (
        <Box key={item.id} m={1} width="30%">
          <TextField
            value={item.word
              .replace("<o>", "")
              .replace("</o>", "")
              .replace(".", "")}
            onChange={(e) => handleChange(item.id, e.target.value)}
          />
        </Box>
      ))}
    </Box>
  );
};
