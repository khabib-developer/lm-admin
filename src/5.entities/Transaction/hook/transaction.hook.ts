import { useCallback } from "react";
import { useTransactionStore } from "../model/transaction.store";
import { useAxios } from "../../../6.shared";

export const useTransactionHook = () => {
  const trStore = useTransactionStore();
  const { fetchData } = useAxios();
  const updateTransaction = useCallback(
    async (id: number, formData: FormData) => {
      const tr = await fetchData(
        `/payments/transaction-admin/${id}/`,
        "PUT",
        formData
      );
      if (tr) trStore.updateTransaction(tr);
    },
    []
  );

  return { updateTransaction };
};
