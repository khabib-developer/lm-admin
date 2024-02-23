import { useCallback, useState } from "react";
import { LIMIT_ITEMS, useAxios } from "../../../6.shared";

export const useProperNounHook = () => {
  const [count, setCount] = useState(0);
  const { fetchData } = useAxios();
  const getProperNouns = useCallback(async (offset: number) => {
    const properNouns = await fetchData(
      `/properNoun/?limi=${LIMIT_ITEMS}&offset=${offset}`,
      "GET"
    );
  }, []);

  return { count, getProperNouns };
};
