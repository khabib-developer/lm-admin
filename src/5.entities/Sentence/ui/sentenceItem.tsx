import { Box, Grid, IconButton, Paper } from "@mui/material";
import { ISentence } from "../types";
import { useSentenceHook } from "../hooks/sentence.hook";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
interface IComponent {
  sentence: ISentence;
}

export const SentenceItem = (props: IComponent) => {
  const { VisualizeErrors } = useSentenceHook();
  return (
    <Paper
      sx={{
        bgcolor: "background.default",
        p: 3,
        display: "flex",
        width: "95%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: VisualizeErrors(props.sentence.new_value),
        }}
      />
      <Box>
        <IconButton>
          <PreviewIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Paper>
  );
};
