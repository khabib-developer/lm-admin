import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useSentenceHook } from "../hooks/sentence.hook";
import { useSentenceStore } from "../model/sentence.store";

export const DeleteSentence = () => {
  const { deleteSentenceId, setDeleteSentenceId } = useSentenceStore();
  const { deleteSentenceItem } = useSentenceHook();
  return (
    <Dialog
      open={Boolean(deleteSentenceId)}
      onClose={() => setDeleteSentenceId(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ bgcolor: "background.default" }}>
        Are you sure to delete?
      </DialogTitle>

      <DialogActions sx={{ bgcolor: "background.default" }}>
        <Button onClick={() => setDeleteSentenceId(null)} color="info">
          No
        </Button>
        <Button onClick={() => deleteSentenceItem()} autoFocus color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
