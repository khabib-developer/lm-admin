import { Box } from "@mui/system";
import { SentenceSideBar } from "../../3.widgets";
import { Outlet } from "react-router";
import { SentenceNavbar } from "../../4.features";

export const Sentence = () => {
  return (
    <Box display="flex">
      <SentenceSideBar />
      <Box p={3} width="100%">
        <SentenceNavbar />
        <Outlet />
      </Box>
    </Box>
  );
};
