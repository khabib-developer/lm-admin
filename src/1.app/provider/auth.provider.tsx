import { useEffect, useState } from "react";
import { useAuthHook } from "../hooks/auth.hook";
import { useChatHook } from "../../4.features";
export type TComponent = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: TComponent) => {
  const [permission, setPermission] = useState(false);
  const auth = useAuthHook();
  const chat = useChatHook();
  useEffect(() => {
    (async function () {
      setPermission(await auth.check());
      await chat.getUsersList();
    })();
  }, []);
  if (permission) return <>{children}</>;
  return <></>;
};
