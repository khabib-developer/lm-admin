import { useTermsStore } from "../model/terms.store";
import { Box, Button } from "@mui/material";
import { TermItem } from "./termsItem";
import { useState } from "react";
import { TextAreaModal } from "./textareaModal";
import { DeleteTermItem } from "./deleteTerm";

export const TermsCRUD = () => {
  const termsStore = useTermsStore();

  const [id, setId] = useState<number | null>(null);

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ mb: 2, mx: 1 }}
        onClick={() => setId(-1)}
      >
        Create
      </Button>
      <Box height="calc(100vh - 165px)" overflow="auto">
        <Box display="flex" flexWrap="wrap">
          {termsStore.terms.map((term) => (
            <TermItem term={term} key={term.id} setId={setId} />
          ))}
        </Box>
      </Box>
      <TextAreaModal id={id} setId={setId} />
      <DeleteTermItem />
    </Box>
  );
};
