import { useCallback } from "react";
import { LIMIT_ITEMS, useAxios } from "../../../6.shared";
import { sentenceStatus, useSentenceStore } from "../../../5.entities";

export const useSentenceFeatureHook = () => {
  const axios = useAxios();

  const { setSentences } = useSentenceStore();

  const getSentences = useCallback(
    async (status: keyof typeof sentenceStatus, offset: any) => {
      if (Number.isNaN(offset)) return;

      const result = await axios.fetchData(
        `/sentence/?limi=${LIMIT_ITEMS}&offset=${offset}`,
        "GET"
      );

      if (result) setSentences(result);

      console.log(result);

      return true;
    },
    []
  );

  return { getSentences };
};
