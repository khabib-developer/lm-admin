import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useTermsStore } from "../model/terms.store";
import { useTermsHook } from "../hooks/terms.hook";

export const DeleteTermItem = () => {
  const { deleteTermId, setDeleteTermId } = useTermsStore();
  const { deleteTerm } = useTermsHook();
  const handleDelete = () => {
    if (!deleteTermId) return;
    deleteTerm(deleteTermId);
    setDeleteTermId(null);
  };
  return (
    <Dialog
      open={Boolean(deleteTermId)}
      onClose={() => setDeleteTermId(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ bgcolor: "background.default" }}>
        Are you sure to delete?
      </DialogTitle>

      <DialogActions sx={{ bgcolor: "background.default" }}>
        <Button onClick={() => setDeleteTermId(null)} color="info">
          No
        </Button>
        <Button onClick={handleDelete} autoFocus color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
