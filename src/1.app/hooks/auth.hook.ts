import { useCallback } from "react";
import { AUTH_URL, useAppStore, useAxios } from "../../6.shared";
import { useNavigate } from "react-router-dom";
import { useNotificationHook } from "../../3.widgets";

export const useAuthHook = () => {
  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const { setCookie, setUser } = useAppStore();

  const { connect } = useNotificationHook();
  const check = useCallback(async () => {
    try {
      const user = await fetchData(
        `/auth/user/`,
        "GET",
        null,
        {},
        false,
        false
      );

      if (!user) return navigate(AUTH_URL, { replace: true });

      setUser(user);

      let cookie = "";

      document.cookie.split(";").forEach((item) => {
        if (item.includes("sessionid")) {
          cookie = item.split("=")[1];
        }
      });

      if (cookie) {
        setCookie(cookie);
        connect(cookie);
        return user;
      }
    } catch (error) {}
  }, []);
  const login = useCallback(async () => {
    const user = await fetchData(`/auth/user/`, "POST", {
      username: "admin",
      password: 12,
    });
    return user;
  }, []);
  return { check, login };
};
