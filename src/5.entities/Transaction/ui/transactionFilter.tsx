import { transactionStatus } from "../types";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface IComponent {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const TransactionFilter = (props: IComponent) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.setStatus(event.target.value);
  };

  return (
    <Box width={120} height={36.5}>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={props.status}
        onChange={handleChange}
        label="Status"
        variant="standard"
        sx={{ width: "120px", px: 1 }}
      >
        <MenuItem value="all">
          <em>All</em>
        </MenuItem>
        {Object.keys(transactionStatus).map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
