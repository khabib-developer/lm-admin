import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useTermsHook } from "../hooks/terms.hook";
import { useTermsStore } from "../model/terms.store";

interface IProps {
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
}

export const TextAreaModal = (props: IProps) => {
  const [text, setText] = useState("");
  const { terms } = useTermsStore();
  const handleClose = () => props.setId(null);
  const { updateTerms } = useTermsHook();
  const update = useMemo(() => props.id && props.id > 0, [props.id]);
  const handleSubmit = () => {
    if (props.id) {
      updateTerms(props.id, text);
      handleClose();
    }
  };
  useEffect(() => {
    if (props.id && props.id > 0) {
      setText(terms.find((term) => term.id === props.id)?.text || "");
    } else setText("");
  }, [props.id, terms]);
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={Boolean(props.id)}
      onClose={handleClose}
    >
      <DialogTitle sx={{ bgcolor: "background.default" }}>
        {update ? "Update a term" : "Create a new term"}
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
      </DialogContent>
      <DialogActions sx={{ px: 2, bgcolor: "background.default" }}>
        <Button onClick={handleClose} color="info">
          Close
        </Button>
        <Button onClick={handleSubmit} color="info">
          {!update ? "Create" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
