import { Paper, Typography } from "@mui/material";
import { formattedNumber } from "../../../6.shared";

export const Balance = () => {
  return (
    <Paper
      sx={{
        bgcolor: "#1b1b1b",
        p: 4,
        borderRadius: 5,
        display: "flex",
        gap: 1,
      }}
    >
      <Typography variant="h5">Balance: </Typography>
      <Typography variant="h5">{formattedNumber(1000000)} sum</Typography>
    </Paper>
  );
};
