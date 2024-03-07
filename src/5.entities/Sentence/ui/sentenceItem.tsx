import { Box, IconButton, Paper, Typography } from "@mui/material";
import { ISentence, sentenceStatus } from "../types";
import { useSentenceHook } from "../hooks/sentence.hook";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSentenceStore } from "../model/sentence.store";
interface IComponent {
  sentence: ISentence;
}

export const SentenceItem = (props: IComponent) => {
  const { VisualizeErrors, getStatusFromURl } = useSentenceHook();
  const { setSentenceId, setDeleteSentenceId } = useSentenceStore();
  const handleClick = () => setSentenceId(props.sentence.id);
  const handleDelete = () => setDeleteSentenceId(props.sentence.id);
  return (
    <Paper
      sx={{
        bgcolor: "background.default",
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: VisualizeErrors(props.sentence.new_value),
        }}
      />
      <Box display="flex" alignItems="center" gap={3}>
        <Box display="flex" gap={1} alignItems="center">
          Public:{" "}
          <Typography color="secondary">
            {props.sentence.cheater_public_count}
          </Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          Mock:{" "}
          <Typography color="secondary">
            {props.sentence.cheater_mock_count}
          </Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          Wrong number:{" "}
          <Typography color="red">{props.sentence.actual_number}</Typography>
        </Box>
        <Typography fontStyle="italic" color="whitesmoke">
          Actual number: {props.sentence.actual_number}
        </Typography>
        <IconButton onClick={handleClick}>
          <PreviewIcon color="info" />
        </IconButton>
        {(getStatusFromURl === sentenceStatus.done ||
          getStatusFromURl === sentenceStatus.waiting) && (
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};
