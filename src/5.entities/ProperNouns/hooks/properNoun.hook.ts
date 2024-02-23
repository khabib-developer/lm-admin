import { useCallback } from "react";
import { LIMIT_ITEMS, useAxios } from "../../../6.shared";
import { useProperNounStore } from "../model/properNoun.store";

export const useProperNoun = () => {
  const { fetchData } = useAxios();
  const { deleteProperNoun, updateProperNoun } = useProperNounStore();
  const deleteItem = useCallback(async (id: number) => {
    const result = await fetchData(`/properNoun/${id}`, "DELETE");
    if (result) deleteProperNoun(id);
  }, []);

  const updateItem = useCallback(async (id: number, text: string) => {
    const result = await fetchData(`/properNoun/${id}`, "PUT", { id, text });
    if (result) updateProperNoun(id, text);
  }, []);

  return { deleteItem, updateItem };
};
