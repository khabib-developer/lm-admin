import { useCallback } from "react";
import { useAxios } from "../../../6.shared";
import { useChatStore } from "../../../5.entities";

export const useChatHook = () => {
  const { fetchData } = useAxios();
  const { setUserList } = useChatStore();
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

  return { getUsersList };
};
