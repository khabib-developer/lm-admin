import { useCallback } from "react";
import { useVariablesStore } from "../model/variables.store";
import { useAxios } from "../../../6.shared";
import { IGlobalVariables } from "../model/types.store";

export const useVariablesHook = () => {
  const { globalVariable, setGlobalVariable } = useVariablesStore();
  const { fetchData } = useAxios();
  const getVariables = useCallback(async () => {
    const result = await fetchData("/auth/admin-global/", "GET");
    console.log(result);

    setGlobalVariable(result);
  }, []);

  const changeGlobalVariables = useCallback(
    async (data: IGlobalVariables) => {
      if (globalVariable) {
        const result = await fetchData(
          `/auth/admin-global/${globalVariable.id}/`,
          "PUT",
          data,
          {},
          true,
          false
        );
        if (result) setGlobalVariable(result);
        return result;
      }
    },
    [fetchData, globalVariable]
  );

  return { getVariables, changeGlobalVariables };
};
