import { useEffect, useState } from "react";
import { IHistory } from "../types";
import { useSentenceHook } from "../hooks/sentence.hook";
import { HistoryItem } from "./historyItem";
import { Box } from "@mui/material";
import { LoadingHistory } from "../../../6.shared";

type THistoryList = {
  sentenceId: number;
};

export const HistoryList = (props: THistoryList) => {
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<IHistory[]>([]);

  const { getSentenceHistory } = useSentenceHook();

  useEffect(() => {
    (async function (id: number) {
      setLoading(true);
      const history = await getSentenceHistory(id);
      if (history) setHistory(history);
      setLoading(false);
    })(props.sentenceId);
  }, [props.sentenceId]);

  return (
    <Box px={10} pt={5} height="calc(100vh - 338px)" sx={{ overflowY: "auto" }}>
      <Box position="relative">
        <LoadingHistory loading={loading} wrapperheight="calc(100vh - 338px)" />
      </Box>
      {history
        .sort((a, b) => b.id - a.id)
        .map((version, i) => (
          <HistoryItem
            key={version.id}
            history={version}
            index={history.length - i}
          />
        ))}
    </Box>
  );
};
