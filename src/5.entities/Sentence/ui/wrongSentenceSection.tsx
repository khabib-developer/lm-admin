import { Box, Button } from "@mui/material";
import { useSentenceHook } from "../hooks/sentence.hook";
interface IProps {
  id: number;
}
export const WrongSentenceSection = ({ id }: IProps) => {
  const { changeWrongStatus } = useSentenceHook();
  return (
    <Box display="flex" px={2} pt={2} gap={2} justifyContent="end">
      <Button
        variant="contained"
        color="success"
        onClick={() => changeWrongStatus(id, "accept")}
      >
        Accept
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => changeWrongStatus(id, "reject")}
      >
        Reject
      </Button>
    </Box>
  );
};
