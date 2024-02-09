import { Box } from "@mui/system";
import { SentenceSideBar } from "../../3.widgets";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SentenceRoutes } from "../../6.shared";
import { SentenceNavbar } from "../../4.features";

export const Sentence = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(SentenceRoutes.new.replace(":offset", "1"));
  }, []);
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
