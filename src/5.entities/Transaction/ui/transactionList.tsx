import { Box } from "@mui/material";
import { ITransaction } from "../types";
import { TransactionItem } from "./transactionItem";

interface ITransactionList {
  transactions: ITransaction[];
}

export const TransactionList = (props: ITransactionList) => {
  return (
    <Box display="flex" flexWrap="wrap" pt={2} gap={1}>
      {props.transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </Box>
  );
};
