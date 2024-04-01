import { useCallback } from "react";
import { AUTH_URL, useAppStore, useAxios } from "../../6.shared";
import { useNotificationHook } from "../../3.widgets";

export const useAuthHook = () => {
  const { fetchData } = useAxios();
  const { setCookie, setUser } = useAppStore();

  const { connect } = useNotificationHook();
  const check = useCallback(async () => {
    try {
      await fetchData("/auth/user/", "POST", {
        username: "admin",
        password: 12,
      });
      const user = await fetchData(
        `/auth/user/`,
        "GET",
        null,
        {},
        false,
        false
      );

      // eslint-disable-next-line no-restricted-globals
      if (!user || !user.is_staff) return location.assign(AUTH_URL);

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

  return { check };
};
