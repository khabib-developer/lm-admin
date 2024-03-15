/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from "@mui/material";
import { ProperNounsList } from "../../../5.entities";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LIMIT_ITEMS,
  PaginationComponent,
  ProperNounsRoute,
} from "../../../6.shared";
import { useProperNounHook } from "../hooks/properNouns.hook";

export const ProperNouns = () => {
  const { offset } = useParams();
  const navigate = useNavigate();
  const { count, getProperNouns, handleExport } = useProperNounHook();
  useEffect(() => {
    (async function () {
      await getProperNouns(Number(offset) - 1 || 0);
    })();
  }, [offset]);
  const handlePaginate = (offset: number) =>
    navigate(ProperNounsRoute.replace(":offset", String(offset)));
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
      <Box display="flex" width="100%" justifyContent="end">
        <Button onClick={handleExport} variant="contained">
          Export
        </Button>
      </Box>
      <ProperNounsList />
      <PaginationComponent
        count={Math.ceil(count / LIMIT_ITEMS) || 0}
        fn={handlePaginate}
      />
    </Box>
  );
};
