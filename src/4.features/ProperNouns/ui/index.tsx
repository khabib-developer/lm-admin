import { Box } from "@mui/material";
import { ProperNounsList } from "../../../5.entities";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationComponent } from "../../../6.shared";
import { useProperNounHook } from "../hooks/properNouns.hook";

export const ProperNouns = () => {
  const { offset } = useParams();
  const navigate = useNavigate();
  const { count, getProperNouns } = useProperNounHook();
  useEffect(() => {
    (async function () {
      await getProperNouns(Number(offset) || 0);
    })();
  }, [offset]);
  const handlePaginate = (offset: number) => navigate(`/${offset}`);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      p={3}
      height="-webkit-fill-available"
    >
      <ProperNounsList />
      <PaginationComponent count={count} fn={handlePaginate} />
    </Box>
  );
};
