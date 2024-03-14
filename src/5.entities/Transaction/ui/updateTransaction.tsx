import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useTransactionStore } from "../model/transaction.store";
import { ChangeEvent, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { transactionStatus } from "../types";
import { useTransactionHook } from "../hook/transaction.hook";
import { useAppStore } from "../../../6.shared";
import ClearIcon from "@mui/icons-material/Clear";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UpdateTransaction = () => {
  const transactionStore = useTransactionStore();

  const fileRef = useRef<null | HTMLInputElement>(null);

  const { setError } = useAppStore();

  const { updateTransaction } = useTransactionHook();

  const [description, setDescription] = useState("");

  const [url, setUrl] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const handleClose = () => {
    transactionStore.setTransactionData();
    setDescription("");
    handleClear();
  };

  const handleClear = () => {
    setFile(null);
    setUrl("");
    if (fileRef && fileRef.current) fileRef.current.value = "";
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    const reader = new FileReader();

    reader.onloadend = () => {
      setUrl(typeof reader.result === "string" ? reader.result : "");
    };

    if (file) {
      setFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      transactionStore.transactionStatus === transactionStatus.paid &&
      file === null
    )
      return setError("Image is required field");

    if (description.trim() === "")
      return setError("Description is required field");

    const formData = new FormData();

    formData.append("status", String(transactionStore.transactionStatus));
    formData.append("id", String(transactionStore.transactionId));
    formData.append("description", description);

    if (transactionStore.transactionStatus === transactionStatus.paid)
      formData.append("receipt", file!);

    updateTransaction(transactionStore.transactionId!, formData);

    handleClose();
  };

  return (
    <Dialog
      open={Boolean(transactionStore.transactionId)}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: "form",
        sx: { background: "#1c1c1c" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Update transaction</DialogTitle>
      <DialogContent>
        {transactionStore.transactionStatus === transactionStatus.paid && (
          <Box display="flex" justifyContent="space-between">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{ height: "fit-content" }}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                ref={fileRef}
                onChange={handleFile}
                type="file"
              />
            </Button>
            {url.trim() !== "" && (
              <Box width="50%" position="relative" py={2} textAlign="end">
                <IconButton
                  onClick={handleClear}
                  size="small"
                  sx={{
                    position: "absolute",
                    background: "black",
                    right: "-14px",
                    top: 0,

                    ":hover": { background: "black" },
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>

                <img width="70%" src={url} alt="Uploaded" />
              </Box>
            )}
          </Box>
        )}

        <TextField
          autoFocus
          color="primary"
          margin="dense"
          id="name"
          name="email"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ mx: 2 }} variant="contained" type="submit">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
