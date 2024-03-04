import { useCallback } from "react";
import { useAppStore, useAxios } from "../../../6.shared";
import { useChatStore } from "../../../5.entities";

export const useChatHook = () => {
  const { fetchData } = useAxios();
  const { setUserList, userList, pushToUserList } = useChatStore();
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
  }, []);

  const updateUsersList = useCallback(
    async (id: number) => {
      console.log(
        !userList.find((user) => user.id === id),
        user?.id !== id,
        user?.id,
        id
      );
      if (!userList.find((user) => user.id === id) && user?.id !== id) {
        await getUsersList();
        // const user = await fetchData(`/auth/admin/${id}`, "GET");
        // console.log(user);
        // if (user) pushToUserList(user);
      }
    },
    [user]
  );

  return { getUsersList, updateUsersList };
};
