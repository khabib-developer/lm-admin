import {
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ISentence, sentenceStatus } from "../types";
import { useSentenceHook } from "../hooks/sentence.hook";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSentenceStore } from "../model/sentence.store";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppStore } from "../../../6.shared";
interface IComponent {
  sentence: ISentence;
}

export const SentenceItem = (props: IComponent) => {
  const { VisualizeErrors, getStatusFromURl, updateSentenceItem } =
    useSentenceHook();
  const { setSentenceId, setDeleteSentenceId } = useSentenceStore();
  const handleClick = () => setSentenceId(props.sentence.id);
  const handleDelete = () => setDeleteSentenceId(props.sentence.id);

  const { setInfo } = useAppStore();

  const [actual, setActual] = useState(props.sentence.actual_number);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number.isNaN(Number(value)) || Number(value) < 0) return;
    setActual(Number(value));
  };

  useEffect(() => {
    if (props.sentence) {
      setActual(props.sentence.actual_number);
    }
  }, [props.sentence]);

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "NumpadEnter" || event.code === "Enter") {
      updateSentenceItem(
        props.sentence.id,
        props.sentence.old_value,
        props.sentence.new_value,
        actual
      );
      setInfo("Sentence updated");
    }
  };

  return (
    <Paper
      sx={{
        bgcolor: "background.default",
        py: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container>
        <Grid item xs={4} display="flex" alignItems="center" px={3}>
          <div
            dangerouslySetInnerHTML={{
              __html: VisualizeErrors(props.sentence.new_value, props.sentence.status === sentenceStatus.other),
            }}
          />
        </Grid>

        <Grid
          item
          xs={8}
          display="flex"
          alignItems="center"
          gap={3}
          justifyContent="end"
        >
          <Box flex={1}></Box>
          <Box flex={1}></Box>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            <Typography>Public: </Typography>
            <Typography color="secondary">
              {props.sentence.cheater_public_count}
            </Typography>
          </Box>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            Mock:{" "}
            <Typography color="secondary">
              {props.sentence.cheater_mock_count}
            </Typography>
          </Box>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            Wrong :{" "}
            <Typography color="red">{props.sentence.wrong_number}</Typography>
          </Box>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            <Typography fontStyle="italic" color="whitesmoke">
              Actual :
            </Typography>
            <TextField
              value={actual}
              variant="standard"
              sx={{ width: "20px" }}
              disabled={
                props.sentence.status !== sentenceStatus.processing ||
                props.sentence.has_proper_noun
              }
              onKeyUp={handleKeyUp}
              onChange={handleChange}
            />
          </Box>
          <Box flex={1} display="flex" justifyContent="center">
            <IconButton onClick={handleClick}>
              <PreviewIcon color="info" />
            </IconButton>
            {(getStatusFromURl === sentenceStatus.done ||
              getStatusFromURl === sentenceStatus.mock) && (
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
