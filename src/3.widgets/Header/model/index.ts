import {
  ChatRoutes,
  GlobalVariablesRoutes,
  MessageTypes,
  PaymentRoutes,
  ProperNounsRoute,
  SentenceRoutes,
  TermsRoute,
  UsersRoutes,
} from "../../../6.shared";

export const navItems = [
  {
    url: SentenceRoutes.new.replace(":offset", "1"),
    name: "Sentence",
    notification: MessageTypes.rejected_sentence,
  },
  {
    url: ProperNounsRoute.replace(":offset", "1"),
    name: "Proper Nouns",
    notification: MessageTypes.proper_nouns,
  },
  {
    url: UsersRoutes.main.replace(":offset", "1"),
    name: "Users",
    notification: MessageTypes.appeal,
  },
  {
    url: ChatRoutes.main,
    name: "Chat",
    notification: MessageTypes.message,
  },
  {
    url: PaymentRoutes.main.replace(":offset", "1"),
    name: "Payment",
    notification: MessageTypes.transaction,
  },
  {
    url: GlobalVariablesRoutes.main,
    name: "Global variables",
  },
  {
    url: TermsRoute,
    name: "Terms",
  },
];
