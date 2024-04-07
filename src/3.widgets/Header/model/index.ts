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
    notification: MessageTypes.rejected_sentence + MessageTypes.proper_nouns,
  },
  {
    url: ProperNounsRoute.replace(":offset", "1"),
    name: "Correct word",
  },
  {
    url: UsersRoutes.main.replace(":offset", "1"),
    name: "Users",
  },
  {
    url: ChatRoutes.main,
    name: "Chat",
    notification: MessageTypes.message + MessageTypes.appeal,
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
