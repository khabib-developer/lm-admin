import { useCallback } from "react";
import { useTransactionStore } from "../model/transaction.store";
import { MessageTypes, useAppStore, useAxios } from "../../../6.shared";

export const useTransactionHook = () => {
  const trStore = useTransactionStore();
  const { deletNotifications, notifications } = useAppStore();
  const { fetchData } = useAxios();
  const updateTransaction = useCallback(
    async (id: number, formData: FormData) => {
      const tr = await fetchData(
        `/payments/transaction-admin/${id}/`,
        "PUT",
        formData
      );
      if (tr) {
        const notification = notifications.find(
          (n) => n.type === MessageTypes.transaction && n.value.id === id
        );
        trStore.updateTransaction(tr);
        notification && deletNotifications([notification.id], fetchData);
      }
    },
    [notifications]
  );

  return { updateTransaction };
};
