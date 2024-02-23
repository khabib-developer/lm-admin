import { useEffect, useState } from "react";
import { useAuthHook } from "../hooks/auth.hook";
import { Box } from "@mui/material";
export type TComponent = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: TComponent) => {
  const [permission, setPermission] = useState(false);
  const auth = useAuthHook();
  useEffect(() => {
    (async function () {
      await auth.login();
      setPermission(await auth.check());
    })();
  }, []);
  if (permission) return <>{children}</>;
  return <></>;
};
