import { useCallback, useEffect } from "react";
import { LIMIT_ITEMS, useAppStore, useAxios } from "../../../6.shared";
import { useUsersStore } from "../model/users.store";

export const useUsersHook = () => {
  const { fetchData } = useAxios();

  const { setUsers, userId } = useUsersStore();

  const { setInfo } = useAppStore();

  const getUsersList = useCallback(async (offset: number) => {
    const usersList = await fetchData(
      `/auth/admin?limit=${LIMIT_ITEMS}&offset=${offset}`,
      "GET",
      null,
      {},
      false
    );

    if (usersList && usersList.results) setUsers(usersList.results);

    return usersList;
  }, []);

  const getUserById = useCallback(async () => {
    if (userId) {
      const user = await fetchData(`/auth/admin/${userId}`, "GET");
      if (user) return user;
    }
  }, [userId]);

  const changeUserAccess = useCallback(async (id: number) => {}, []);

  const updateScores = useCallback(async () => {
    setInfo("Changes successfully updated");
  }, []);

  return { getUsersList, getUserById, updateScores };
};
