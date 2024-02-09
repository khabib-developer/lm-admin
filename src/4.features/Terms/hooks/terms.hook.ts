import { useCallback, useEffect } from "react";
import { useAxios } from "../../../6.shared";
import { useTermsStore } from "../model/terms.store";

export const useTermsHook = () => {
  const axios = useAxios();
  const temrsStore = useTermsStore();
  useEffect(() => {
    (async function () {
      //   const terms = await axios.fetchData("/getTerms", "GET");
      //   terms && temrsStore.setTerms(terms);
    })();
  }, []);

  const updateTerms = useCallback(async (text: string) => {
    // const terms = await axios.fetchData("/updateTerms", "PUT", { text });
    // terms && temrsStore.setTerms(terms);
  }, []);

  return { updateTerms };
};
