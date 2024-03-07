import { useCallback } from "react";
import { useAppStore, useAxios } from "../../../6.shared";
import { IMessage, useChatStore } from "../../../5.entities";

export const useChatHook = () => {
  const { fetchData } = useAxios();
  const { setUserList, userList } = useChatStore();
  const { addMessage } = useChatStore();
  const { user } = useAppStore();
  const getUsersList = useCallback(async () => {
    const usersList = await fetchData(
      `/message/admin-message/`,
      "GET",
      null,
      {},
      false
    );
    if (usersList) setUserList(usersList);
  }, [fetchData, setUserList]);

  const updateUsersList = useCallback(
    async (id: number, message: IMessage) => {
      if (!userList.find((user) => user.id === id) && user?.id !== id) {
        await getUsersList();
      } else {
        addMessage(id, message);
      }
    },
    [addMessage, getUsersList, user?.id, userList]
  );

  return { getUsersList, updateUsersList };
};
