import { useCallback, useState } from "react";
import { LIMIT_ITEMS, useAxios } from "../../../6.shared";
import { typeOfSortKeys, useTransactionStore } from "../../../5.entities";

export const usePaymentHook = () => {
  const { fetchData } = useAxios();
  const { setTransactions } = useTransactionStore();

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

  const downloadPaidTransactions = useCallback(async () => {
    await fetchData(
      `/payments/transaction-admin/paid_transaction_export_execl/`,
      "GET"
    );
  }, []);

  return { getTransactions, downloadPaidTransactions };
};
