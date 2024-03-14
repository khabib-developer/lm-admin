import { useCallback } from "react";
import { useTransactionStore } from "../model/transaction.store";
import {
  MessageTypes,
  PaymentRoutes,
  useAppStore,
  useAxios,
} from "../../../6.shared";
import { useNavigate } from "react-router-dom";
import { useUsersStore } from "../../User";

export const useTransactionHook = () => {
  const trStore = useTransactionStore();
  const { deletNotifications, notifications } = useAppStore();
  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const { setUserId } = useUsersStore();
  const updateTransaction = useCallback(
    async (id: number, formData: FormData) => {
      const tr = await fetchData(
        `/payments/transaction-admin/${id}/`,
        "PUT",
        formData
      );
      if (tr) {
        setUserId(null);
        const notification = notifications.find(
          (n) => n.type === MessageTypes.transaction && n.value.id === id
        );
        trStore.updateTransaction(tr);
        trStore.setSearchValue(String(id));
        navigate(`${PaymentRoutes.main.replace(":offset", "1")}`);
        notification && deletNotifications([notification.id], fetchData);
      }
    },
    [notifications]
  );

  return { updateTransaction };
};
