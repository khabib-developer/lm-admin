import { Box, Grid, Paper, Typography } from "@mui/material";
import { ITransaction } from "../../../5.entities/Transaction/types";
import {
  SortByAmount,
  SortByCreatedAt,
  TransactionFilter,
  sortKeys,
  TransactionSearch,
  typeOfSortKeys,
  typeofTransactionStatus,
  TransactionList,
} from "../../../5.entities";
import { useCallback, useEffect, useState } from "react";
import { green, teal } from "@mui/material/colors";

interface IComponent {
  transactions: ITransaction[];
}
export const TransactionHistory = (props: IComponent) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortKey, setSortKey] = useState<typeOfSortKeys>(sortKeys.created_at);
  const [asc, setAsc] = useState(true);
  const [opts, setOpts] = useState<typeofTransactionStatus[]>([]);

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const tx = props.transactions
      .filter(
        (tr) =>
          !!opts.find((option) => option === tr.status) &&
          srch(tr.id, searchValue)
      )
      .sort(sort);

    setTransactions(tx);
  }, [searchValue, sortKey, asc, opts]);

  const srch = useCallback(
    (id: number, value: string) =>
      value.trim() === "" ? true : String(id).includes(value),
    []
  );

  const sort = useCallback(
    (tr1: ITransaction, tr2: ITransaction) => {
      return asc
        ? 1
        : -1 *
            (sortKey === sortKeys.amount
              ? tr1.amount - tr2.amount
              : tr1.id - tr2.id);
    },
    [sortKey, asc]
  );

  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: "#1b1b1b",
        p: 4,
        borderRadius: 5,
        mt: 3,
        height: "calc(100vh - 470px)",
        overflowY: "auto",
      }}
    >
      <Grid container>
        <Grid xs={4} item display="flex" gap={2} px="2px">
          <Box
            height="100%"
            width="15px"
            sx={{ background: teal[700], borderRadius: 3 }}
          ></Box>
          <Typography variant="h6">Transactions history</Typography>
        </Grid>
        <Grid xs={8} item container px="2px">
          <Grid item xs={3} display="flex" justifyContent="end">
            <TransactionSearch value={searchValue} setValue={setSearchValue} />
          </Grid>

          <Grid item xs={3} display="flex" justifyContent="end">
            <SortByCreatedAt
              setSortKey={setSortKey}
              sortKey={sortKey}
              asc={asc}
              setAsc={setAsc}
            />
          </Grid>

          <Grid item xs={3} display="flex" justifyContent="end">
            <SortByAmount
              setSortKey={setSortKey}
              sortKey={sortKey}
              asc={asc}
              setAsc={setAsc}
            />
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="end">
            <TransactionFilter setOptios={setOpts} />
          </Grid>
        </Grid>
      </Grid>
      <TransactionList transactions={transactions} />
    </Paper>
  );
};
