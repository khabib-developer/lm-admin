import { Button } from "@mui/material";
import { useSentenceHook } from "../hooks/sentence.hook";

export const ExportSentenses = () => {
  const { handleExport } = useSentenceHook();
  return (
    <Button onClick={handleExport} variant="contained">
      Export{" "}
    </Button>
  );
};
