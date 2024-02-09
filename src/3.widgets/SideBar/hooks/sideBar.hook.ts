import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSentenceHook } from "../../../5.entities";

export const useSideBarHook = () => {
  const { pathname } = useLocation();
  const { getStatusFromURl } = useSentenceHook();
  const activeSection = useCallback(
    (url: string) => {
      return getStatusFromURl === url;
    },
    [pathname]
  );
  return { activeSection };
};
