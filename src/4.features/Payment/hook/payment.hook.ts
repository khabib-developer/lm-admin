/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { LIMIT_ITEMS, downloadFile, useAxios } from "../../../6.shared";
import { typeOfSortKeys, useTransactionStore } from "../../../5.entities";

export const usePaymentHook = () => {
  const { fetchData } = useAxios();
  const { setTransactions } = useTransactionStore();

  const [balance, setBalance] = useState(0);
  const [spent, setSpent] = useState(0);

  const getTransactions = useCallback(
    async (
      offset: number,
      search: string,
      status: string,
      sortKey: typeOfSortKeys,
      asc: boolean
    ) => {
      let p1 = "";
      let searcuhUrl = "";
      let limit = `?limit=${LIMIT_ITEMS}`;
      let offst = `&offset=${offset}`;
      let p2 = status === "all" ? "" : `&status=${status}`;
      let sort = `&sort=${asc ? "" : "-"}${sortKey}`;

      const isSearch = search.trim() !== "";

      if (isSearch) {
        p1 = `?search=${search}`;
        searcuhUrl = "search_transaction/";
        limit = "";
        offst = "";
        p2 = "";
        sort = "";
      }

      const data = await fetchData(
        `/payments/transaction-admin/${searcuhUrl}${limit}${offst}${p1}${p2}${sort}`,
        "GET"
      );

      const modifiedData = isSearch ? (data.user ? [data] : []) : data.results;
      const count = isSearch ? 0 : data.count;

      if (data) {
        setTransactions(modifiedData, count);
      }
    },
    []
  );

  const getBalance = useCallback(async () => {
    const response = await fetchData(`/auth/admin-global/get_balance/`, "GET");
    if (response) {
      setBalance(response.balance);
      setSpent(response.transactions_amount);
    }
  }, []);

  const downloadPaidTransactions = useCallback(async () => {
    const response = await fetchData(
      `/payments/transaction-admin/paid_transaction_export_excel/`,
      "GET"
    );
    if (response) downloadFile(response.url);
  }, []);

  return {
    getTransactions,
    downloadPaidTransactions,
    getBalance,
    balance,
    spent,
  };
};
