import { Button } from "@mui/material";
import { useSentenceHook } from "../hooks/sentence.hook";

export const ExportSentenses = () => {
  const { handleExport } = useSentenceHook();
  return (
    <Button onClick={handleExport} size="small" sx={{flex:1}} variant="contained">
      Export{" "}
    </Button>
  );
};
