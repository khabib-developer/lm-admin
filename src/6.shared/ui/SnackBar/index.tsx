import { Alert, Snackbar } from "@mui/material";
import { useAppStore } from "../../store/app.store";

export const SnackbarInfo = () => {
  const { info, setInfo } = useAppStore();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setInfo(null);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!info}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          onClick={handleClose}
          severity="info"
          sx={{ width: "100%", cursor: "pointer" }}
        >
          {info}
        </Alert>
      </Snackbar>
    </>
  );
};

export const SnackbarError = () => {
  const { error, setError } = useAppStore();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setError(null);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!error}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          onClick={handleClose}
          severity="error"
          sx={{ width: "100%", cursor: "pointer" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
