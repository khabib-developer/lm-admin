import { Box } from "@mui/material";
import {
  IQuantity,
  SentenceItem,
  sentenceStatus,
  useSentenceHook,
  useSentenceStore,
} from "../../../5.entities";
import {
  LIMIT_ITEMS,
  LoadingItems,
  PaginationComponent,
  SentenceRoutes,
} from "../../../6.shared";
import { useEffect, useState } from "react";
import { useSentenceFeatureHook } from "../hooks/useSentenceHook";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const SentenceTable = () => {
  const navigate = useNavigate();
  const { getStatusFromURl } = useSentenceHook();
  const { getSentences } = useSentenceFeatureHook();
  const { quantity, sortBy, sortKeyword } = useSentenceStore();
  const [loading, setLoading] = useState(true);
  const { offset } = useParams();
  const { sentences } = useSentenceStore();

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    (async function () {
      setLoading(
        !(await getSentences(
          getStatusFromURl as keyof typeof sentenceStatus,
          (Number(offset) - 1) * LIMIT_ITEMS,
          sortBy,
          sortKeyword
        ))
      );
    })();
  }, [location, sortBy, sortKeyword, offset]);

  const handlePaginate = async (offset: number) => {
    navigate(
      `${SentenceRoutes[
        getStatusFromURl as keyof typeof sentenceStatus
      ].replace(":offset", String(offset))}`
    );
  };
  return (
    <Box
      pt={3}
      display="flex"
      flexDirection="column"
      height="calc(100vh - 178.5px)"
      position="relative"
    >
      <LoadingItems
        wrapperheight={"calc(100vh - 232.5px)"}
        height={88}
        loading={loading}
      />
      <Box
        flex={1}
        display="flex"
        sx={{ overflowY: "scroll", opacity: Number(!loading) }}
        justifyContent="start"
        flexDirection="column"
        gap={3}
      >
        {sentences.map((sentence) => (
          <SentenceItem sentence={sentence} key={sentence.id} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <PaginationComponent
          count={
            Math.ceil(
              quantity[getStatusFromURl as keyof IQuantity] / LIMIT_ITEMS
            ) || 0
          }
          fn={handlePaginate}
        />
      </Box>
    </Box>
  );
};
