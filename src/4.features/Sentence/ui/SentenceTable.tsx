import { Box, Typography } from "@mui/material";
import {
  IQuantity,
  SentenceItem,
  sentenceStatus,
  useSentenceHook,
  useSentenceStore,
} from "../../../5.entities";
import { LIMIT_ITEMS, PaginationComponent } from "../../../6.shared";
import { useEffect, useState } from "react";
import { useSentenceFeatureHook } from "../hooks/useSentenceHook";
import { useParams } from "react-router-dom";

export const SentenceTable = () => {
  const { getStatusFromURl } = useSentenceHook();
  const { getSentences } = useSentenceFeatureHook();
  const { quantity } = useSentenceStore();
  const [loading, setLoading] = useState(true);
  const { offset } = useParams();
  useEffect(() => {
    (async function () {
      setLoading(
        !(await getSentences(
          getStatusFromURl as keyof typeof sentenceStatus,
          (Number(offset) - 1) * LIMIT_ITEMS
        ))
      );
    })();
  }, [getStatusFromURl]);
  const { sentences } = useSentenceStore();
  const handlePaginate = async (offset: number) => {
    setLoading(true);
    setLoading(
      !(await getSentences(
        getStatusFromURl as keyof typeof sentenceStatus,
        (Number(offset) - 1) * LIMIT_ITEMS
      ))
    );
  };
  return (
    <Box
      pt={3}
      display="flex"
      flexDirection="column"
      height="calc(100vh - 178.5px)"
    >
      <Box
        flex={1}
        display="flex"
        sx={{ overflowY: "scroll" }}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={3}
      >
        {loading ? (
          <Typography>loading...</Typography>
        ) : (
          sentences.map((sentence) => (
            <SentenceItem sentence={sentence} key={sentence.id} />
          ))
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <PaginationComponent
          count={quantity[getStatusFromURl as keyof IQuantity]}
          fn={handlePaginate}
        />
      </Box>
    </Box>
  );
};
