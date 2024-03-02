import { Box, Container } from "@mui/material";
import { Balance, useTransactionStore } from "../../../5.entities";
import {
  LIMIT_ITEMS,
  PaginationComponent,
  PaymentRoutes,
} from "../../../6.shared";
import { useNavigate } from "react-router-dom";
import { Transactions } from "./transactions";

export const PaymentComponent = () => {
  const navigate = useNavigate();

  const { count } = useTransactionStore();

  const handlePagination = (offset: number) => {
    navigate(`${PaymentRoutes.main.replace(":offset", String(offset))}`);
  };
  return (
    <Container sx={{ py: 3, height: "calc(100vh - 64px)" }}>
      <Balance />
      <Transactions />

      <Box display="flex" justifyContent="center" pt={3}>
        <PaginationComponent
          count={Math.ceil(count / LIMIT_ITEMS) || 0}
          fn={handlePagination}
        />
      </Box>
    </Container>
  );
};
