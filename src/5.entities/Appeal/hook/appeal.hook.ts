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
  const [publicCheat, setPublic] = useState(0);

  const handleReset = useCallback(() => {
    if (props.appeal.appeal) {
      const publicValue =
        props.appeal.appeal.verify_score_sentence.penalty +
        props.appeal.appeal.verify_score_sentence.verify_score -
        props.appeal.appeal.verify_score_sentence.collected_this_sentence;
      setVerified(props.appeal.appeal.verify_score_sentence.verify_score);
      setPenalty(
        props.appeal.appeal.verify_score_sentence.penalty > 0
          ? props.appeal.appeal.verify_score_sentence.penalty - 1
          : 0
      );
      setPublic(publicValue);
    }
  }, [props.appeal]);

  const handleClick = (isIncrement: boolean) => {
    if (isIncrement) {
      if (
        props.appeal.appeal?.verify_score_sentence.collected_this_sentence === 0
      )
        return;
      if (penalty > 0) {
        setVerified((prev) => prev + 1);
        setPenalty((prev) => prev - 1);
      }
    } else {
      if (verified >= 0) {
        let penaltyFn = (prev: number) => prev + 1;
        let verifyFn = (prev: number) => prev - 1;
        // if (
        //   props.appeal.appeal?.verify_score_sentence.collected_this_sentence ===
        //   0
        // ) {
        //   penaltyFn = (prev: number) => Number(!Boolean(prev));
        //   verifyFn = (prev: number) => prev;
        // }
        setPenalty(penaltyFn);
        setVerified(verifyFn);
      }
    }
  };

  const handlePublic = () => {
    setPublic((prev) => Number(!prev));
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
        penalty: penalty + publicCheat,
        appeal_answer_message: `Id: ${props.appeal.appeal?.id} uchun shikoyat xati<br><br>${typedMessage}`,
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
    publicCheat,
    verified,
    penalty,
    handleClick,
    handleReset,
    handleSubmit,
    handlePublic,
  };
};
