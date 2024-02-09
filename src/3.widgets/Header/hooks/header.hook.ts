import { useCallback } from "react";
import { AUTH_URL, useAxios } from "../../../6.shared";
import { useLocation, useNavigate } from "react-router";

export const useHeaderHook = () => {
  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useCallback(async () => {
    await fetchData(`/auth/logout`, "GET");
    navigate(AUTH_URL, { replace: true });
  }, []);

  const currentLocation = useCallback(
    (url: string) => {
      return pathname.includes(url)
        ? {
            color: "#cbffdd",
          }
        : {};
    },
    [pathname]
  );

  return { logout, currentLocation };
};
