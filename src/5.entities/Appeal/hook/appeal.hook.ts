import { useCallback, useState } from "react";
import {
  INotification,
  MessageTypes,
  useAppStore,
  useAxios,
} from "../../../6.shared";
import { useChatStore } from "../../Chat";
import { IProps } from "../ui";

export const useAppealHook = (props: IProps) => {
  const { setError, deletNotifications, notifications } = useAppStore();
  const { typedMessage, modifyAppealStatus, setTypedMessage } = useChatStore();

  const { fetchData } = useAxios();

  const [verified, setVerified] = useState(0);
  const [penalty, setPenalty] = useState(0);

  const handleReset = useCallback(() => {
    if (props.appeal.appeal) {
      setVerified(props.appeal.appeal.verify_score_sentence.verify_score);
      setPenalty(props.appeal.appeal.verify_score_sentence.penalty);
    }
  }, [props.appeal]);

  const handleClick = (isIncrement: boolean) => {
    if (isIncrement) {
      if (penalty > 0) {
        setVerified((prev) => prev + 1);
        setPenalty((prev) => prev - 1);
      }
    } else {
      if (verified > 0) {
        setPenalty((prev) => prev + 1);
        setVerified((prev) => prev - 1);
      }
    }
  };

  const handleSubmit = useCallback(() => {
    if (typedMessage.trim() === "") {
      return setError("Appeal answer text is required");
    }
    props.sendMessage(
      {
        appeal_id: props.appeal.appeal?.id,
        verify_score_sentence_id: props.appeal.appeal?.verify_score_sentence.id,
        collected_this_sentence:
          props.appeal.appeal?.verify_score_sentence.collected_this_sentence,
        verify_score: verified,
        penalty,
        appeal_answer_message: `Answer for appeal Id: ${props.appeal.appeal?.id} <br><br>${typedMessage}`,
      },
      "appeal_answer"
    );
    const notification = notifications.find(
      (notification: INotification) =>
        notification.type === MessageTypes.appeal &&
        notification.value.id === props.appeal.id
    );
    modifyAppealStatus(props.appeal.sender, props.appeal.id);
    notification && deletNotifications([notification.id], fetchData);
    setTypedMessage("");
  }, [
    typedMessage,
    props,
    verified,
    penalty,
    notifications,
    modifyAppealStatus,
    deletNotifications,
    fetchData,
    setTypedMessage,
    setError,
  ]);

  return {
    verified,
    penalty,
    handleClick,
    handleReset,
    handleSubmit,
  };
};
