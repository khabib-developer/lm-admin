/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import {
  LIMIT_ITEMS,
  sortType,
  sortTypeValues,
  useAxios,
} from "../../../6.shared";
import {
  sentenceStatus,
  typeOfSortSentence,
  useSentenceStore,
} from "../../../5.entities";

export const useSentenceFeatureHook = () => {
  const axios = useAxios();

  const { setSentences, setQuantity } = useSentenceStore();

  const getSentences = useCallback(
    async (
      status: keyof typeof sentenceStatus,
      offset: any,
      sortBy: typeOfSortSentence,
      sort: sortTypeValues,
      search: string
    ) => {
      if (Number.isNaN(offset)) return;

      const searchId = search.trim() === "" ? "" : `search=${search.slice(1)}`;

      const query =
        search.trim() === ""
          ? `limit=${LIMIT_ITEMS}&offset=${offset}&status=${
              sentenceStatus[status]
            }&sort=${sort === sortType.asc ? sortBy : sortType.desc + sortBy}`
          : "";

      const result = await axios.fetchData(
        `/sentence/admin/?${query}${searchId}`,
        "GET",
        null,
        {},
        false
      );

      const quantity = await axios.fetchData(
        `/sentence/admin/count_status`,
        "GET",
        null,
        {},
        false
      );

      if (quantity)
        setQuantity({
          [sentenceStatus.others]: quantity.others || 0,
          [sentenceStatus.new]: quantity.new_count,
          [sentenceStatus.mock]: quantity.mock_count,
          [sentenceStatus.has_proper_noun]: quantity.has_proper_noun_count,
          [sentenceStatus.processing]: quantity.processing_count,
          [sentenceStatus.wrong]: quantity.wrong_count,
          [sentenceStatus.done]: quantity.done_count,
          [sentenceStatus.waiting]: quantity.done_waiting_count,
        });

      if (result) {
        const data = search.trim() === "" ? result.results : result;
        setSentences(data);
      }

      return true;
    },
    []
  );

  return { getSentences };
};
