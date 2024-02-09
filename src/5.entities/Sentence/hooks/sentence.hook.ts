import { useCallback, useMemo } from "react";
import { BASE_URL, useAppStore, useAxios } from "../../../6.shared";
import { ICreateDataset } from "../types";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material/styles/createTypography";

export const useSentenceHook = () => {
  const axios = useAxios();
  const appStore = useAppStore();
  const { pathname } = useLocation();
  const create = useCallback(async (data: ICreateDataset) => {
    const dataset = await axios.fetchData("/dataset", "POST", data);
    if (dataset) {
      appStore.setInfo("Successfully added to dataset");
      console.log(dataset);
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
      console.log(respond);
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

  const getStatusFromURl = useMemo(() => pathname.split("/")[3], [pathname]);

  return {
    create,
    createBulk,
    exportSentences,
    getStatusFromURl,
    VisualizeErrors,
  };
};
