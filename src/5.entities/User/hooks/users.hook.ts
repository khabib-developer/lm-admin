/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { LIMIT_ITEMS, useAppStore, useAxios } from "../../../6.shared";
import { useUsersStore } from "../model/users.store";

export const useUsersHook = () => {
  const { fetchData } = useAxios();

  const [count, setCount] = useState(0);

  const { setUsers, userId } = useUsersStore();

  const { setInfo } = useAppStore();

  const getUsersList = useCallback(async (offset: number, search: string) => {
    const isSearch = search.trim() !== "";

    const query = !isSearch ? `?limit=${LIMIT_ITEMS}&offset=${offset}` : "";
    const searchId = isSearch ? `?search=${search}` : "";

    const usersList = await fetchData(
      `/auth/admin${query}${searchId}`,
      "GET",
      null,
      {},
      false
    );

    if (usersList) {
      setCount(usersList.count);

      isSearch ? setUsers(usersList) : setUsers(usersList.results);
    }

    return usersList;
  }, []);

  const getUserById = useCallback(async () => {
    if (userId) {
      const user = await fetchData(`/auth/admin/${userId}`, "GET");
      if (user) return user;
    }
  }, [userId]);

  const changeUserAccess = useCallback(async (id: number, blocked: boolean) => {
    const response = await fetchData(`/score/score/${id}/`, "PATCH", {
      blocked,
    });
    response && setInfo("Changes successfully updated");
  }, []);

  const updateScores = useCallback(
    async (
      id: number,
      verified: number,
      penalty: number,
      mock_cheating: number,
      public_cheating: number
    ) => {
      const response = await fetchData(`/score/score/${id}/`, "PATCH", {
        verified,
        penalty,
        mock_cheating,
        public_cheating,
      });
      response && setInfo("Changes successfully updated");
    },
    []
  );

  return { getUsersList, getUserById, updateScores, count, changeUserAccess };
};
