import { Box, IconButton, TextField } from "@mui/material";
import { IProperNoun } from "../types";
import { useEffect, useState } from "react";
import { useProperNoun } from "../hooks/properNoun.hook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface IComponent {
  item: IProperNoun;
}
export const ProperNoun = (props: IComponent) => {
  const { deleteItem, updateItem } = useProperNoun();
  const [value, setValue] = useState("");
  useEffect(() => {
    if (props.item) setValue(props.item.text);
  }, [props]);
  const handleUpdate = () => {
    if (value.trim() === "") updateItem(props.item.id, value);
  };
  const handleDelete = () => deleteItem(props.item.id);
  const handleKeyUp = (event: React.KeyboardEvent) =>
    (event.code === "Enter" || event.code === "NumpadEnter") && handleUpdate();
  return (
    <Box display="flex" gap={1} alignItems="center">
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="standard-basic"
        variant="standard"
        onKeyUp={handleKeyUp}
      />
      <IconButton onClick={handleUpdate}>
        <EditIcon fontSize="small" color="info" />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon color="error" fontSize="small" />
      </IconButton>
    </Box>
  );
};
