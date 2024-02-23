import {
  ChatRoutes,
  GlobalVariablesRoutes,
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
  },
  {
    url: ProperNounsRoute.replace(":offset", "1"),
    name: "Proper Nouns",
  },
  {
    url: UsersRoutes.main.replace(":offset", "1"),
    name: "Users",
  },
  {
    url: ChatRoutes.main,
    name: "Chat",
  },
  {
    url: PaymentRoutes.main,
    name: "Payment",
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
