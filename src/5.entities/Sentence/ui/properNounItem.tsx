import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { IProperNoun, properNounClass, properNounStatus } from "../types";
import { ChangeEvent, useCallback, useMemo } from "react";
import { useSentenceStore } from "../model/sentence.store";
interface IProps {
  properNoun: IProperNoun;
  originalData: IProperNoun[];
  // setText: Dispatch<SetStateAction<string>>;
}
export const ProperNounItem = (props: IProps) => {
  const { changeProperNoun, setSentenceText, sentenceText } =
    useSentenceStore();

  const handleChangeClass = (event: SelectChangeEvent) => {
    const key = "class";
    changeProperNoun<typeof key>(
      props.properNoun.id,
      key,
      event.target.value as IProperNoun[typeof key]
    );
  };

  const currentOriginalNoun = useMemo(
    () => props.originalData.find((item) => item.id === props.properNoun.id),
    [props.originalData, props.properNoun]
  );

  const checkForUpdated = useCallback(
    (key: keyof IProperNoun) => {
      return (
        props.originalData.find((item) => item.id === props.properNoun.id)?.[
          key
        ] === props.properNoun[key]
      );
    },
    [props.originalData, props.properNoun]
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof IProperNoun
  ) => {
    const inputValue = event.target.value;
    const status = "status";
    const base = "base";
    const value = "value";
    const errorValue = "errorValue";
    const errorBase = "errorBase";

    if (inputValue.includes(" ")) return;

    const sanitizedValue = inputValue
      // .replace(/[^A-Za-z'\d]/g, "")
      .replace(/'{2,}/g, "'")
      .replace(/,{2,}/g, ",")
      .replace(/\.{2,}/g, ".")
      .replace(/!{2,}/g, "!")
      .replace(/\?{2,}/g, "?");
    // .replace(/"{2,}/g, "'");

    const bool =
      key === value
        ? sanitizedValue.includes(props.properNoun.base)
        : props.properNoun.value.includes(sanitizedValue);

    changeProperNoun<typeof errorBase>(props.properNoun.id, errorBase, !bool);
    changeProperNoun<typeof errorValue>(props.properNoun.id, errorValue, !bool);

    if (key === value) {
      setSentenceText(
        sentenceText
          .split(" ")
          .map((word, index) =>
            index === props.properNoun.index ? `<u>${sanitizedValue}</u>` : word
          )
          .join(" ")
      );

      changeProperNoun<typeof errorValue>(
        props.properNoun.id,
        errorValue,
        sanitizedValue === ""
      );
    }

    let st = checkForUpdated(value)
      ? sanitizedValue === ""
        ? properNounStatus.delete
        : properNounStatus.accept
      : sanitizedValue === ""
      ? properNounStatus.delete
      : properNounStatus.edit;

    if (key === value) {
      st = checkForUpdated(base)
        ? properNounStatus.delete
        : sanitizedValue !== currentOriginalNoun?.value
        ? properNounStatus.edit
        : properNounStatus.accept;
    }

    changeProperNoun<typeof status>(props.properNoun.id, status, st);
    changeProperNoun<typeof key>(props.properNoun.id, key, sanitizedValue);
  };
  return (
    <Box display="flex" gap={2}>
      <TextField
        color="warning"
        size="small"
        value={props.properNoun.value}
        onChange={(event) => handleChange(event, "value")}
        error={props.properNoun.errorValue}
        placeholder="value"
      />
      <TextField
        color="warning"
        size="small"
        value={props.properNoun.base}
        onChange={(event) => handleChange(event, "base")}
        placeholder="Base"
        error={props.properNoun.errorBase}
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel color="warning" id="demo-simple-select-label">
          Class
        </InputLabel>
        <Select
          color="warning"
          MenuProps={{
            MenuListProps: { sx: { bgcolor: "background.default" } },
          }}
          value={props.properNoun.class}
          label="class"
          onChange={handleChangeClass}
        >
          {Object.keys(properNounClass).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
