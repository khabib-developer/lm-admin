import { useCallback, useEffect } from "react";
import { useAppStore, useAxios } from "../../../6.shared";
import { useTermsStore } from "../model/terms.store";

export const useTermsHook = () => {
  const axios = useAxios();
  const termStore = useTermsStore();
  const { setInfo } = useAppStore();
  useEffect(() => {
    (async function () {
      const terms = await axios.fetchData("/auth/admin-terms/", "GET");
      if (terms) {
        termStore.setTerms(terms);
      }
    })();
  }, []);

  const updateTerms = useCallback(
    async (id: number, text: string) => {
      let method = "POST";
      let url = `/auth/admin-terms/`;
      const update = id > 0;
      if (update) {
        method = "PUT";
        url = `/auth/admin-terms/${id}/`;
      }
      const response = await axios.fetchData(url, method, { text });
      if (response) {
        setInfo("Database successfully updated");
        if (update) termStore.updateTerm(response);
        else termStore.addTerm(response);
      }
    },
    [axios]
  );

  const deleteTerm = useCallback(async (id: number) => {
    const term = await axios.fetchData(`/auth/admin-terms/${id}/`, "DELETE");
    if (term) {
      termStore.deleteTerm(id);
      setInfo("Term successfully deleted");
    }
  }, []);

  return { updateTerms, deleteTerm };
};
