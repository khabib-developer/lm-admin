import { SentenceModal, UserModalItem } from "../../4.features";
import { DeleteSentence, UpdateTransaction } from "../../5.entities";

export const Modals = () => {
  return (
    <>
      <UpdateTransaction />
      <UserModalItem />
      <SentenceModal />
      <DeleteSentence />
    </>
  );
};
