import { useCallback } from "react";
import { AUTH_URL, useAxios } from "../../6.shared";
import { useNavigate } from "react-router-dom";

export const useAuthHook = () => {
  const { fetchData } = useAxios();
  const navigate = useNavigate();

  const check = useCallback(async () => {
    const user = await fetchData(`/auth/`, "GET", null, {}, false, false);
    if (!user) return navigate(AUTH_URL, { replace: true });
    return user;
  }, []);
  const login = useCallback(async () => {
    const user = await fetchData(`/auth/`, "POST", {
      username: "admin",
      password: 12,
    });
    return user;
  }, []);
  return { check, login };
};
