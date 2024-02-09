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

export const CreateSentence = () => {
  const [open, setOpen] = useState(false);

  const [is_mock, setIsMock] = useState(false);

  const [text, setText] = useState("");

  const hooks = useSentenceHook();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIsMock(event.target.checked);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (text.trim() !== "") await hooks.create({ old_value: text, is_mock });
    setText("");
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
        <DialogTitle>Create a new sentence</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="new__text"
            ></textarea>
          </Box>
          <Box
            display="flex"
            justifyContent="end"
            gap={3}
            alignItems="center"
            pt={3}
          >
            <Typography>Mock?</Typography>
            <Switch
              checked={is_mock}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 2 }}>
          <Button onClick={handleSubmit}>Create</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
