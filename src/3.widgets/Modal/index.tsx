import { SentenceModal, UserModalItem } from "../../4.features";
import { DeleteSentence } from "../../5.entities";

export const Modals = () => {
  return (
    <>
      <UserModalItem />
      <SentenceModal />
      <DeleteSentence />
    </>
  );
};
