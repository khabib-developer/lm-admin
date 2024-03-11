import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSentenceHook } from "../hooks/sentence.hook";
import { ICreateDataset } from "../types";

export const CreateSentence = () => {
  const [open, setOpen] = useState(false);

  const [is_mock, setIsMock] = useState(false);

  const [text, setText] = useState("");

  const [correct, setCorrect] = useState("");

  const hooks: ReturnType<typeof useSentenceHook> = useSentenceHook();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIsMock(event.target.checked);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (text.trim() !== "" || (is_mock && correct.trim() !== "")) {
      const data: ICreateDataset = { text, is_mock };
      if (is_mock) data.correct_text = correct;
      await hooks.create(data);
    }
    setText("");
    setCorrect("");
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ bgcolor: "background.default" }}>
          Create a new sentence
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "background.default" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="text"
              className="new__text"
            ></textarea>
          </Box>
          {is_mock && (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
              <textarea
                value={correct}
                placeholder="correct version"
                onChange={(e) => setCorrect(e.target.value)}
                className="new__text"
              ></textarea>
            </Box>
          )}
          <Box
            display="flex"
            justifyContent="end"
            gap={3}
            alignItems="center"
            pt={3}
          >
            <Typography>Mock</Typography>
            <Switch
              checked={is_mock}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 2, bgcolor: "background.default" }}>
          <Button onClick={handleSubmit} color="info">
            Create
          </Button>
          <Button onClick={handleClose} color="info">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
