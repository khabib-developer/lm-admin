import { useCallback, useMemo } from "react";
import {
  BASE_URL,
  SentenceRoutes,
  sortType,
  useAppStore,
  useAxios,
} from "../../../6.shared";
import {
  ICreateDataset,
  IQuantity,
  ISentence,
  sentenceStatus,
  sortSentence,
} from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useSentenceStore } from "../model/sentence.store";

export const useSentenceHook = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const appStore = useAppStore();
  const { pathname } = useLocation();
  const { setSort, deleteSentence, updateSentence, deleteSentenceId } =
    useSentenceStore();
  const create = useCallback(async (data: ICreateDataset) => {
    const sentence = await axios.fetchData("/sentence/admin/", "POST", data);
    if (sentence) {
      appStore.setInfo("Sentence successfully created");
      setSort(sortSentence.Created, sortType.desc);

      const url = sentence.is_mock
        ? SentenceRoutes.mock.replace(":offset", String(1))
        : SentenceRoutes.new.replace(":offset", String(1));

      navigate(url);
    }
  }, []);

  const createBulk = useCallback(async (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file);
    const respond = await axios.fetchData(
      "/dataset/bulkCreate",
      "POST",
      formdata
    );
    if (respond) {
      appStore.setInfo("Successfully created");
      setSort(sortSentence.Created, sortType.desc);
      navigate(
        `${SentenceRoutes[
          getStatusFromURl as keyof typeof sentenceStatus
        ].replace(":offset", String(1))}`
      );
    }
  }, []);

  const exportSentences = useCallback(async () => {
    const response = await axios.fetchData("/dataset/export", "GET");
    if (response) {
      const a = document.createElement("a");
      a.href = `${BASE_URL}${response}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, []);

  const VisualizeErrors = useCallback((text: string) => {
    let array = text.split(" ");

    const errRegex = /<r>[A-z'\d]+<\/r>/;
    const warningRegex = /<y>[A-z'\d]+<\/y>/;

    array = array.map((word) => {
      const color =
        word.match(errRegex) === null
          ? word.match(warningRegex) === null
            ? ""
            : "yellow"
          : "red";
      return `<span style="color:${color}">${word}</span>`;
    });

    return array.join(" ");
  }, []);

  const getSentenceHistory = useCallback(async (sentenceId: number) => {
    const history = await axios.fetchData(
      `/sentence/admin/${sentenceId}/sentence_update_history/`,
      "GET",
      null,
      {},
      false
    );

    return history;
  }, []);

  const getStatusFromURl = useMemo(() => pathname.split("/")[3], [pathname]);

  const updateSentenceItem = useCallback(
    async (sentence_id: number, old_value: string, new_value: string) => {
      const result = await axios.fetchData(
        `/sentence/admin/update_new_processing_status/`,
        "POST",
        { sentence_id, old_value, new_value }
      );

      if (result) updateSentence(result);
    },
    []
  );

  const deleteSentenceItem = useCallback(async () => {
    if (deleteSentenceId) {
      const sentence: ISentence = await axios.fetchData(
        `/sentence/admin/${deleteSentenceId}`,
        "DELETE"
      );
      if (sentence) deleteSentence(getStatusFromURl as keyof IQuantity);
    }
  }, [deleteSentenceId]);

  return {
    create,
    createBulk,
    exportSentences,
    getStatusFromURl,
    VisualizeErrors,
    getSentenceHistory,
    updateSentenceItem,
    deleteSentenceItem,
  };
};
