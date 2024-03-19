import { Box, Button } from "@mui/material";
import { sortSentence, typeOfSortSentence } from "../types";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import { useSentenceStore } from "../model/sentence.store";
import { sortType } from "../../../6.shared";
export const SortSentences = () => {
  const { sortBy, sortKeyword, setSort } = useSentenceStore();
  const handleClick = (text: typeOfSortSentence) => {
    const sort = sortKeyword === sortType.desc ? sortType.asc : sortType.desc;
    setSort(text, sort);
  };
  return (
    <>
      {Object.keys(sortSentence).map((item) => {
        const current =
          sortBy === sortSentence[item as keyof typeof sortSentence];
        return (
          <Button
            key={item}
            size='small'
            sx={{ color: "white", gap: 1, flex:1 }}
            variant={current ? "contained" : "outlined"}
            onClick={() =>
              handleClick(sortSentence[item as keyof typeof sortSentence])
            }
          >
            {sortKeyword === sortType.asc ? (
              <NorthIcon
                sx={{ fontSize: "12px" }}
                color={current ? "action" : "disabled"}
              />
            ) : (
              <SouthIcon
                sx={{ fontSize: "12px" }}
                color={current ? "action" : "disabled"}
              />
            )}
            {item}
          </Button>
        );
      })}
    </>
  );
};
