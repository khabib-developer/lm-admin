/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from "react";
import {
  SentenceRoutes,
  downloadFile,
  sortType,
  useAppStore,
  useAxios,
} from "../../../6.shared";
import {
  ICreateDataset,
  IQuantity,
  ISentence,
  properNounsStatus,
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
  const {
    setSort,
    deleteSentence,
    updateSentence,
    deleteSentenceId,
    setDeleteSentenceId,
    setQuantity,
    quantity,
  } = useSentenceStore();
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
      "/sentence/sentence_post_json/",
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
    async (
      sentence_id: number,
      old_value: string,
      new_value: string,
      actual_number: number = 0
    ) => {
      const result: ISentence = await axios.fetchData(
        `/sentence/admin/update_new_processing_status/`,
        "POST",
        { sentence_id, old_value, new_value, actual_number }
      );

      if (result) {
        console.log(getStatusFromURl, result.status);

        if (
          getStatusFromURl === sentenceStatus.processing &&
          result.status === sentenceStatus.waiting
        ) {
          deleteSentence(getStatusFromURl as keyof IQuantity);
          setQuantity({
            ...quantity,
            [sentenceStatus.processing]:
              quantity[sentenceStatus.processing] - 1,
            [sentenceStatus.waiting]: quantity[sentenceStatus.waiting] + 1,
          });
        }

        updateSentence(result);
        appStore.setInfo("Sentence updated");
      }
    },
    [quantity]
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

  const getWordWithoutTags = (word: string) =>
    word.replace("<u>", "").replace("</u>", "");

  const handleProperNoun = useCallback(
    async (
      id: number,
      sentence_value: string,
      status: keyof typeof properNounsStatus
    ) => {
      const result = await axios.fetchData(
        `/sentence/admin/${id}/proper_nouns_except_or/`,
        "POST",
        {
          status,
          sentence_value,
        }
      );
      if (result) {
        const notification = appStore.notifications.find(
          (n) => n.value.id === id
        );
        const key =
          status === properNounsStatus.delete
            ? sentenceStatus.new
            : status === properNounsStatus.edit
            ? sentenceStatus.processing
            : sentenceStatus.waiting;
        setDeleteSentenceId(id);
        deleteSentence(sentenceStatus.has_proper_noun);

        setQuantity({
          ...quantity,
          [key]: quantity[key] + 1,
        });

        notification &&
          appStore.deletNotifications([notification.id], axios.fetchData);
      }
    },
    [quantity, appStore]
  );

  const handleExport = useCallback(async () => {
    const response = await axios.fetchData(
      "/sentence/admin/sentence_done_export_excel/",
      "GET"
    );
    if (response) downloadFile(response.url);
  }, []);

  const changeWrongStatus = useCallback(
    async (id: number, status: string) => {
      const response = await axios.fetchData(
        `/sentence/admin/wrong_sentence_process/`,
        "POST",
        { sentence_id: id, status }
      );
      if (response) {
        setDeleteSentenceId(id);
        deleteSentence(sentenceStatus.wrong);
        if (status === "reject") {
          setQuantity({
            ...quantity,
            [sentenceStatus.wrong]: quantity[sentenceStatus.wrong] - 1,
            [sentenceStatus.processing]:
              quantity[sentenceStatus.processing] + 1,
          });
        }
      }
    },
    [quantity]
  );

  return {
    create,
    createBulk,
    getStatusFromURl,
    VisualizeErrors,
    getSentenceHistory,
    updateSentenceItem,
    deleteSentenceItem,
    getWordWithoutTags,
    handleProperNoun,
    handleExport,
    changeWrongStatus,
  };
};
