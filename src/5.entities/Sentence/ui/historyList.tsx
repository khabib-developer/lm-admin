/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { IHistory, ISentence } from "../types";
import { useSentenceHook } from "../hooks/sentence.hook";
import { HistoryItem } from "./historyItem";
import { Box } from "@mui/material";
import { LoadingHistory } from "../../../6.shared";

type THistoryList = {
  sentence: ISentence;
};

export const HistoryList = (props: THistoryList) => {
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<IHistory[]>([]);

  const { getSentenceHistory } = useSentenceHook();

  const genesis = useMemo(
    () => ({
      sentence: props.sentence.id,
      id: 0,
      user: {
        id: 0,
        username: "first version",
      },
      user_text: props.sentence.old_value,
      created_at: props.sentence.created_at,
    }),
    [props.sentence]
  );

  useEffect(() => {
    (async function (id: number) {
      setLoading(true);
      const history = await getSentenceHistory(id);
      if (history) setHistory([...history, genesis]);
      setLoading(false);
    })(props.sentence.id);
  }, [props.sentence.id]);

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
            index={history.length - i - 1}
          />
        ))}
    </Box>
  );
};
