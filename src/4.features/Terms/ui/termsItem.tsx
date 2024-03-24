import { IconButton, Paper, Typography } from "@mui/material";
import { ITerm } from "../model/type.store";
import { Dispatch, SetStateAction } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTermsStore } from "../model/terms.store";
interface IProps {
  term: ITerm;
  setId: Dispatch<SetStateAction<number | null>>;
}

export const TermItem = (props: IProps) => {
  const { setDeleteTermId } = useTermsStore();

  const handleClick = () => props.setId(props.term.id);
  const handleDelete = () => setDeleteTermId(props.term.id);
  return (
    <Paper
      sx={{
        bgcolor: "background.default",
        p: 3,
        borderRadius: 4,
        m: 1,
        width: "28%",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "fit-content",
      }}
    >
      <Typography onClick={handleClick} sx={{ flex: 1 }}>
        {props.term.text}
      </Typography>
      <IconButton onClick={handleDelete}>
        <DeleteIcon color="error" />
      </IconButton>
    </Paper>
  );
};
