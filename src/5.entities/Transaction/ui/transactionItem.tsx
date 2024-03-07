import {
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ITransaction, transactionStatus } from "../types";
import dateFormat from "dateformat";
import { useMemo } from "react";
import { useTransactionStore } from "../model/transaction.store";
import { useUsersStore } from "../../User";
import DownloadIcon from "@mui/icons-material/Download";

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
    [props]
  );
  const { setTransactionData } = useTransactionStore();

  const { setUserId } = useUsersStore();

  return (
    <Paper elevation={0} sx={paperStyles}>
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize="small" color="GrayText" variant="body2">
          {dateFormat(props.transaction.updated_at, "mm.dd.yyyy hh:mm")}
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
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          fontStyle="italic"
          fontSize="small"
          variant="body2"
          color="GrayText"
          sx={{ cursor: "pointer" }}
          onClick={() => setUserId(props.transaction.user.id)}
        >
          User: {props.transaction.user.first_name}{" "}
          {props.transaction.user.last_name}
        </Typography>
        {props.transaction.status === transactionStatus.paid && (
          <a
            target="_blank"
            href={`${props.transaction.receipt}`}
            rel="noreferrer"
          >
            <IconButton size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </a>
        )}
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
          disabled={props.transaction.status === transactionStatus.paid}
          onClick={() =>
            setTransactionData(props.transaction.id, transactionStatus.paid)
          }
        >
          Pay
        </Button>
        <Button
          size="small"
          disabled={props.transaction.status !== transactionStatus.pending}
          sx={{ borderRadius: 2 }}
          color="error"
          variant="outlined"
          onClick={() =>
            setTransactionData(props.transaction.id, transactionStatus.rejected)
          }
        >
          Reject
        </Button>
      </Stack>
    </Paper>
  );
};
