import { Box, Button } from "@mui/material";
import {
  IProperNoun,
  ISentence,
  properNounClass,
  properNounStatus,
} from "../types";
import { useCallback, useEffect, useMemo } from "react";
import { useSentenceHook } from "../hooks/sentence.hook";
import { useSentenceStore } from "../model/sentence.store";
import { ProperNounItem } from "./properNounItem";
const properNounRegex = /<u>[A-z'\d]+<\/u>/;
interface IProps {
  sentence: ISentence;
}

export const PropserNounsSection = (props: IProps) => {
  const { setProperNouns, properNouns, sentenceText, setSentenceText } =
    useSentenceStore();
  const { getWordWithoutTags, handleProperNoun } = useSentenceHook();

  const pprNouns: IProperNoun[] = useMemo(
    () =>
      props.sentence.new_value
        .split(" ")
        .map((word, i) => ({ word, index: i }))
        .filter((item) => item.word.match(properNounRegex))
        .map((item, index) => ({
          id: index,
          base: "",
          class: properNounClass.NULL,
          value: getWordWithoutTags(item.word),
          status: properNounStatus.delete,
          index: item.index,
        })),
    [props.sentence.id]
  );

  useEffect(() => {
    setProperNouns(pprNouns);
  }, [pprNouns]);

  const handleReset = useCallback(() => {
    setSentenceText(props.sentence.new_value);
    setProperNouns(pprNouns);
  }, [props.sentence]);

  const handleClick = (status: keyof typeof properNounStatus) =>
    handleProperNoun(props.sentence.id, sentenceText, status, properNouns);

  const checkForActiveButton = useMemo(() => {
    const err = properNouns.find((item) => item.errorBase || item.errorValue);
    return {
      [properNounStatus.accept]:
        properNouns.filter((item) => item.status === properNounStatus.accept)
          .length === properNouns.length && !err,
      [properNounStatus.edit]:
        properNouns.filter((item) => item.status === properNounStatus.edit)
          .length &&
        !properNouns.find((item) => item.status === properNounStatus.delete) &&
        !err,
      [properNounStatus.delete]: !!properNouns.find(
        (item) => item.status === properNounStatus.delete && !err
      ),
    };
  }, [properNouns]);

  return (
    <Box px={6} pt={2}>
      <Box display="flex" flexDirection="column" gap={2}>
        {properNouns.map((item) => (
          <ProperNounItem
            originalData={pprNouns}
            key={item.id}
            properNoun={item}
          />
        ))}
      </Box>
      <Box display="flex" pt={2} gap={2}>
        <Button onClick={handleReset} variant="contained" color="success">
          Reset
        </Button>
        <Button
          onClick={() => handleClick(properNounStatus.accept)}
          variant="contained"
          disabled={!checkForActiveButton[properNounStatus.accept]}
        >
          Accept
        </Button>
        <Button
          onClick={() => handleClick(properNounStatus.edit)}
          variant="contained"
          color="warning"
          disabled={!checkForActiveButton[properNounStatus.edit]}
        >
          Edit
        </Button>
        <Button
          onClick={() => handleClick(properNounStatus.delete)}
          variant="contained"
          color="error"
          disabled={!checkForActiveButton[properNounStatus.delete]}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};
