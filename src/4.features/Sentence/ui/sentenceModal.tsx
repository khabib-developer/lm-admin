/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSentenceStore } from "../../../5.entities/Sentence/model/sentence.store";
import { sentenceStatus } from "../../../5.entities/Sentence/types";
import { HistoryList } from "../../../5.entities/Sentence/ui/historyList";
import dateFormat from "dateformat";
import { useSentenceHook } from "../../../5.entities/Sentence/hooks/sentence.hook";
import {
  PropserNounsSection,
  ISentence,
  WrongSentenceSection,
} from "../../../5.entities";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const SentenceModal = () => {
  const { sentenceId, setSentenceId, sentences, setDeleteSentenceId } =
    useSentenceStore();

  const sentence: ISentence | undefined = useMemo(
    () => sentences.find((sentence) => sentence.id === sentenceId),
    [sentenceId, sentences]
  );

  useEffect(() => {
    if (sentence) {
      setText(sentence.new_value);
      setOldValue(sentence.old_value);
      setActualNumber(sentence.actual_number);
    }
  }, [sentence]);

  const { getStatusFromURl, updateSentenceItem } = useSentenceHook();

  const [text, setText] = useState("");
  const [old_value, setOldValue] = useState("");

  const [actual_number, setActualNumber] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number.isNaN(Number(value)) || Number(value) < 0) return;
    setActualNumber(Number(value));
  };

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.code === "NumpadEnter" || event.code === "Enter") && sentence) {
      await updateSentenceItem(
        sentence.id,
        old_value,
        sentence.new_value,
        actual_number
      );
    }
  };

  const handleClose = () => setSentenceId(null);

  const handleUpdate = async () => {
    if (sentence) {
      await updateSentenceItem(
        sentence.id,
        sentence.status === sentenceStatus.new ? text : old_value,
        text
      );
    }
  };

  const handleDelete = () => sentence && setDeleteSentenceId(sentence.id);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={Boolean(sentenceId)}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "background.default" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sentence Item
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            bgcolor: "background.default",
            height: "-webkit-fill-available",
          }}
          p={3}
        >
          <Grid container>
            <Grid item xs={6} px={3}>
              <textarea
                readOnly={
                  sentence?.status !== sentenceStatus.new ||
                  sentence.has_proper_noun
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="new__text"
                style={{
                  height: sentence?.is_mock ? "50px" : "",
                }}
              ></textarea>
              {sentence?.is_mock && (
                <textarea
                  value={old_value}
                  onChange={(e) => setOldValue(e.target.value)}
                  className="new__text"
                  style={{ height: "50px" }}
                ></textarea>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              px={3}
              pb={1}
            >
              <Box display="flex">
                <Input
                  id="standard-adornment-amount"
                  value={actual_number}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  sx={{ flex: 1 }}
                  readOnly={sentence?.status !== sentenceStatus.processing}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "italic" }}
                    >
                      Actual number:
                    </InputAdornment>
                  }
                />
                <Input
                  id="standard-adornment-amount"
                  sx={{ color: "red", flex: 1 }}
                  onChange={() => {}}
                  defaultValue={sentence?.wrong_number}
                  readOnly
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "oblique" }}
                    >
                      Wrong number:
                    </InputAdornment>
                  }
                />
              </Box>
              <Box display="flex">
                <Input
                  id="standard-adornment-amount"
                  sx={{ flex: 1 }}
                  onChange={() => {}}
                  readOnly
                  defaultValue={dateFormat(
                    sentence?.created_at,
                    "mmmm dS, yyyy, hh:MM"
                  )}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "oblique" }}
                    >
                      Created:
                    </InputAdornment>
                  }
                />
                <Input
                  id="standard-adornment-amount"
                  onChange={() => {}}
                  sx={{ flex: 1 }}
                  readOnly
                  defaultValue={dateFormat(
                    sentence?.done_waiting_date,
                    "mmmm dS, yyyy, hh:MM"
                  )}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "oblique" }}
                    >
                      Waiting Date:
                    </InputAdornment>
                  }
                />
              </Box>
              <Box display="flex">
                <Input
                  id="standard-adornment-amount"
                  defaultValue={sentence?.cheater_mock_count}
                  onChange={() => {}}
                  sx={{ flex: 1 }}
                  readOnly
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "italic" }}
                    >
                      Mock count:
                    </InputAdornment>
                  }
                />
                <Input
                  id="standard-adornment-amount"
                  sx={{ flex: 1 }}
                  readOnly
                  onChange={() => {}}
                  defaultValue={sentence?.cheater_public_count}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "oblique" }}
                    >
                      Public mock Count:
                    </InputAdornment>
                  }
                />
                <Input
                  id="standard-adornment-amount"
                  sx={{ flex: 1 }}
                  onChange={() => {}}
                  readOnly
                  defaultValue={getStatusFromURl}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "oblique" }}
                    >
                      Status:
                    </InputAdornment>
                  }
                />
                <Input
                  id="standard-adornment-amount"
                  sx={{ flex: 1, fontStyle: "italic" }}
                  readOnly
                  onChange={() => {}}
                  defaultValue={sentence?.is_mock}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ fontStyle: "oblique" }}
                    >
                      Mock:
                    </InputAdornment>
                  }
                />
              </Box>
            </Grid>
          </Grid>
          {sentence && sentence?.has_proper_noun ? (
            <PropserNounsSection
              text={text}
              sentence={sentence}
              setText={setText}
            />
          ) : sentence && sentence.status === sentenceStatus.wrong ? (
            <WrongSentenceSection id={sentence.id} />
          ) : (
            <Box display="flex" justifyContent="end" px={2} gap={2} pt={2}>
              {sentence?.status === sentenceStatus.new && (
                <Button onClick={handleUpdate} variant="contained">
                  Update
                </Button>
              )}
              {(sentence?.status === sentenceStatus.done ||
                sentence?.is_mock) && (
                <Button
                  onClick={handleDelete}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              )}
            </Box>
          )}

          {sentence &&
            (sentence.status !== sentenceStatus.new ||
              sentence.has_proper_noun) && <HistoryList sentence={sentence} />}
        </Box>
      </Dialog>
    </React.Fragment>
  );
};
