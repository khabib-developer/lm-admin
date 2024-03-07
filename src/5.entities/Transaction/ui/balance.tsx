import { Box, Paper, Typography } from "@mui/material";
import { formattedNumber } from "../../../6.shared";
interface IProps {
  balance: number;
  spent: number;
}
export const Balance = (props: IProps) => {
  return (
    <Paper
      sx={{
        bgcolor: "#1b1b1b",
        p: 4,
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" gap={1}>
        <Typography variant="h5">Balance: </Typography>
        <Typography variant="h5">
          {formattedNumber(props.balance - props.spent)} sum;
        </Typography>
      </Box>
      <Box display="flex" gap={1}>
        <Typography variant="h5">Spent: </Typography>
        <Typography variant="h5">{formattedNumber(props.spent)} sum</Typography>
      </Box>
    </Paper>
  );
};
