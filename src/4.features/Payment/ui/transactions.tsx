import {
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  SortByAmount,
  SortByCreatedAt,
  TransactionList,
  TransactionSearch,
  sortKeys,
  transactionStatus,
  typeOfSortKeys,
  useTransactionStore,
} from "../../../5.entities";
import { useParams } from "react-router-dom";
import { usePaymentHook } from "../hook/payment.hook";
import { LIMIT_ITEMS } from "../../../6.shared";
import DownloadIcon from "@mui/icons-material/Download";

export const Transactions = () => {
  const [searchValue, setSearchValue] = useState("");

  const [status, setStatus] = useState<string>(transactionStatus.pending);

  const [sortKey, setSortKey] = useState<typeOfSortKeys>(sortKeys.created_at);
  const [asc, setAsc] = useState(false);

  const { getTransactions, downloadPaidTransactions } = usePaymentHook();

  const { transactions } = useTransactionStore();

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const { offset } = useParams();

  useEffect(() => {
    (async function () {
      await getTransactions(
        (Number(offset) - 1) * LIMIT_ITEMS,
        searchValue,
        status,
        sortKey,
        asc
      );
    })();
  }, [offset, searchValue, status, sortKey, asc, getTransactions]);

  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: "#1b1b1b",
        p: 4,
        borderRadius: 5,
        mt: 3,
        height: "calc(100vh - 344px)",
        overflowY: "auto",
      }}
    >
      <Grid container>
        <Grid xs={4} item display="flex" gap={2} px="2px">
          <Typography variant="h6">Transactions history</Typography>
          <IconButton onClick={downloadPaidTransactions}>
            <DownloadIcon />
          </IconButton>
        </Grid>
        <Grid xs={8} item container px="2px" justifyContent="end">
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
          <Grid
            item
            xs={3}
            gap={2}
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={handleChange}
              label="Status"
              variant="standard"
              sx={{ width: "120px", px: 1 }}
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              {Object.keys(transactionStatus).map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <TransactionList transactions={transactions} />
    </Paper>
  );
};
