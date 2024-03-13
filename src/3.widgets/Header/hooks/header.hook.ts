import { useCallback, useMemo } from "react";
import { AUTH_URL, useAppStore, useAxios } from "../../../6.shared";
import { useLocation, useNavigate } from "react-router";

export const useHeaderHook = () => {
  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { notifications } = useAppStore();
  const logout = useCallback(async () => {
    await fetchData(`/auth/user/logout`, "DELETE");
    navigate(AUTH_URL, { replace: true });
  }, []);

  const currentLocation = useCallback(
    (url: string) => {
      return pathname.includes(url)
        ? {
            color: "#cbffdd",
            paddingBottom: "5px",
          }
        : { paddingBottom: "5px" };
    },
    [pathname]
  );

  const quantityOfNotification = useMemo(
    () => notifications.length,
    [notifications]
  );

  return { logout, currentLocation, quantityOfNotification };
};
