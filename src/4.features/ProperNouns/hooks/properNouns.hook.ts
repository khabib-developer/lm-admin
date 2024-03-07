/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { LIMIT_ITEMS, downloadFile, useAxios } from "../../../6.shared";
import { useProperNounStore } from "../../../5.entities";

export const useProperNounHook = () => {
  const [count, setCount] = useState(0);
  const { fetchData } = useAxios();
  const { setProperNouns } = useProperNounStore();
  const getProperNouns = useCallback(async (offset: number) => {
    const result = await fetchData(
      `/sentence/admin_proper_noun/?limit=${LIMIT_ITEMS}&offset=${offset}`,
      "GET"
    );

    if (result) {
      setCount(result.count);
      setProperNouns(result.results);
    }
  }, []);

  const handleExport = useCallback(async () => {
    const response = await fetchData(
      "/sentence/admin_proper_noun/proper_nouns_export_excel/",
      "GET"
    );
    if (response) downloadFile(response.url);
  }, []);

  return { count, getProperNouns, handleExport };
};
