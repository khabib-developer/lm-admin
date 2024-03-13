import { useCallback, useEffect, useState } from "react";
import { useAppStore, useAxios } from "../../../6.shared";
import { useTermsStore } from "../model/terms.store";

export const useTermsHook = () => {
  const axios = useAxios();
  const { setError } = useAppStore();
  const temrsStore = useTermsStore();
  const [id, setId] = useState(1);
  useEffect(() => {
    (async function () {
      const terms = await axios.fetchData("/auth/admin-terms/", "GET");
      if (terms) {
        temrsStore.setTerms(terms.text);
        setId(terms.id);
      }
    })();
  }, []);

  const updateTerms = useCallback(async () => {
    if (!id) {
      setError("Terms is not created yet");
      return;
    }
    await axios.fetchData(`/auth/admin-terms/${id}/`, "PUT", {
      text: temrsStore.terms,
    });
  }, [id, axios, temrsStore.terms, setError]);

  return { updateTerms };
};
