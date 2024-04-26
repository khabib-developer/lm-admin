/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { IHistory, ISentence, sentenceStatus } from "../types";
import { useSentenceHook } from "../hooks/sentence.hook";
import { HistoryItem } from "./historyItem";
import { Box } from "@mui/material";
import { LoadingHistory } from "../../../6.shared";
import { useSentenceStore } from "../model/sentence.store";
type THistoryList = {
  sentence: ISentence;
};

export const HistoryList = (props: THistoryList) => {
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<IHistory[]>([]);

  const { sentenceText } = useSentenceStore();

  const { getSentenceHistory, getStatusFromURl } = useSentenceHook();

  const dependencyForGenesis =
    getStatusFromURl === sentenceStatus.other
      ? [props.sentence, sentenceText, getStatusFromURl]
      : [props.sentence, getStatusFromURl];

  const genesis = useMemo<IHistory>(() => {
    const user_text =
      getStatusFromURl === sentenceStatus.other ||
      getStatusFromURl === sentenceStatus.new
        ? sentenceText
        : props.sentence.old_value;
    return {
      id: 0,
      sentence: props.sentence.id,
      user: {
        id: 0,
        username: "first version",
      },
      user_text,
      wrong: false,
      created_at: String(props.sentence.created_at),
    };
  }, dependencyForGenesis);

  useEffect(() => {
    (async function (id: number) {
      if (
        props.sentence.status === sentenceStatus.new ||
        props.sentence.status === sentenceStatus.other
      ) {
        setLoading(false);
        return;
      }
      const history = await getSentenceHistory(id);
      if (history) setHistory(history);
      setLoading(false);
    })(props.sentence.id);
  }, [props.sentence.id]);

  const historyIncludingFirstVersion = useMemo(() => {
    if (loading) return [];
    return [...history, genesis];
  }, [history, loading, genesis]);

  return (
    <Box px={10} pt={5}>
      {getStatusFromURl !== sentenceStatus.other &&
        getStatusFromURl !== sentenceStatus.new && (
          <Box position="relative">
            <LoadingHistory
              loading={loading}
              wrapperheight="calc(100vh - 338px)"
            />
          </Box>
        )}

      {historyIncludingFirstVersion.map((version, i) => (
        <HistoryItem
          key={version.id}
          history={version}
          index={history.length - i}
        />
      ))}
    </Box>
  );
};
