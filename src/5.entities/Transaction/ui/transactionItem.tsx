import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { ITransaction, transactionStatus } from "../types";
import dateFormat from "dateformat";
import { useMemo } from "react";

interface ITransactionItem {
  transaction: ITransaction;
}

const paperStyles = {
  bgcolor: "black",
  p: 2,
  borderRadius: 3,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  width: "29.9%",
};

export const TransactionItem = (props: ITransactionItem) => {
  const color = useMemo(
    () =>
      props.transaction.status === transactionStatus.paid
        ? "primary"
        : props.transaction.status === transactionStatus.pending
        ? "warning"
        : "error",
    []
  );
  return (
    <Paper elevation={0} sx={paperStyles}>
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize="small" color="GrayText" variant="body2">
          {dateFormat(props.transaction.created_at, "mm.dd.yyyy hh:mm")}
        </Typography>
        <Chip
          clickable
          size="small"
          color={color}
          sx={{ fontSize: "10px" }}
          label={props.transaction.status}
        />
      </Stack>
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize="small">ID: {props.transaction.id}</Typography>
        <Typography fontSize="small">
          Amount: {props.transaction.amount}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize="small">Gift: {props.transaction.gift}</Typography>
        <Typography fontSize="small">
          Score: {props.transaction.verify_score}
        </Typography>
      </Stack>
      <Stack>
        <Typography fontSize="small" variant="body2" color="GrayText">
          Description: {props.transaction.description}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          size="small"
          sx={{ borderRadius: 2 }}
          color="info"
          variant="outlined"
        >
          Pay
        </Button>
        <Button
          size="small"
          sx={{ borderRadius: 2 }}
          color="error"
          variant="outlined"
        >
          Reject
        </Button>
      </Stack>
    </Paper>
  );
};
