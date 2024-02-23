import { useCallback } from "react";
import { useVariablesStore } from "../model/variables.store";
import { useAxios } from "../../../6.shared";

export const useVariablesHook = () => {
  const { globalVariable, setGlobalVariable } = useVariablesStore();
  const { fetchData } = useAxios();
  const getVariables = useCallback(async () => {
    const result = await fetchData("/auth/admin-global/", "GET");
    setGlobalVariable(result);
  }, []);

  const changeGlobalVariables = useCallback(async () => {
    if (globalVariable) {
      const result = await fetchData(
        `/auth/admin-global/${globalVariable.id}/`,
        "PUT",
        globalVariable
      );

      console.log(result);
    }
  }, [globalVariable]);

  return { getVariables, changeGlobalVariables };
};
