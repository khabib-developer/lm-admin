import { Box, Button, TextField } from "@mui/material";
import { ISentence, properNounsStatus } from "../types";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useSentenceHook } from "../hooks/sentence.hook";
const properNounRegex = /<u>[A-z'\d]+<\/u>/;
interface IProps {
  sentence: ISentence;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

export const PropserNounsSection = (props: IProps) => {
  const [accept, setAccept] = useState(true);
  const [edit, setEdit] = useState(false);
  const properNouns = useMemo(
    () =>
      props.text
        .split(" ")
        .map((word, i) => ({ word, index: i }))
        .filter((word) => word.word.match(properNounRegex)),
    [props.text]
  );

  const { getWordWithoutTags, handleProperNoun } = useSentenceHook();

  const handleChange = (newValue: string, index: number) => {
    if (newValue.includes(" ")) return;
    if (newValue.trim() === "") return;
    setAccept(false);
    setEdit(true);
    props.setText((prev) => {
      return prev
        .split(" ")
        .map((word, i) => {
          if (i === index) return `<u>${newValue.trim()}</u>`;
          return word;
        })
        .join(" ");
    });
  };

  const handleReset = useCallback(() => {
    setAccept(true);
    setEdit(false);
    props.setText(props.sentence.new_value);
  }, [props]);

  const handleClick = (status: keyof typeof properNounsStatus) =>
    handleProperNoun(props.sentence.id, props.text, status);

  return (
    <Box display="flex" px={2} pt={2} gap={2} flexWrap="wrap">
      <Box display="flex" px={2} gap={2}>
        {properNouns.map((item) => (
          <TextField
            key={item.word}
            variant="standard"
            autoFocus={true}
            value={getWordWithoutTags(item.word)}
            onChange={(e) => handleChange(e.target.value, item.index)}
          />
        ))}
      </Box>
      <Button onClick={handleReset} variant="contained" color="inherit">
        Reset
      </Button>
      <Button
        onClick={() => handleClick(properNounsStatus.except)}
        variant="contained"
        disabled={!accept}
      >
        Accept
      </Button>
      <Button
        onClick={() => handleClick(properNounsStatus.edit)}
        variant="contained"
        color="warning"
        disabled={!edit}
      >
        Edit
      </Button>
      <Button
        onClick={() => handleClick(properNounsStatus.delete)}
        variant="contained"
        color="error"
      >
        Delete
      </Button>
    </Box>
  );
};
