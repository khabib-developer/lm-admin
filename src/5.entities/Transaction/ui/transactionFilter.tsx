import { useEffect, useState } from "react";
import { transactionStatus } from "../types";
import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      background: "black",
    },
  },
};

type typeOfValue = Array<keyof typeof transactionStatus>;

const options: typeOfValue = Object.keys(transactionStatus) as typeOfValue;

interface IComponent {
  setOptios: React.Dispatch<React.SetStateAction<typeOfValue>>;
}

export const TransactionFilter = (props: IComponent) => {
  const [selectedOpts, setSelectedOpts] = useState<typeOfValue>(options);

  const handleChange = (event: SelectChangeEvent<typeof selectedOpts>) => {
    const {
      target: { value },
    } = event;
    setSelectedOpts(value as typeOfValue);
    props.setOptios(value as typeOfValue);
  };

  useEffect(() => {
    props.setOptios(options);
  }, []);

  return (
    <Box width={120} height={36.5}>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedOpts}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        sx={{ width: 120, height: 36.5 }}
        MenuProps={MenuProps}
      >
        {options.map((opt: keyof typeof transactionStatus) => (
          <MenuItem key={opt} value={opt}>
            <Checkbox checked={selectedOpts.indexOf(opt) > -1} />
            <ListItemText primary={opt} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
