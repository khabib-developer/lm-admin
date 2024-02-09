import {
  ChatRoutes,
  GlobalVariablesRoutes,
  PaymentRoutes,
  SentenceRoutes,
  TermsRoute,
  UsersRoutes,
} from "../../../6.shared";

export const navItems = [
  {
    url: SentenceRoutes.main,
    name: "Sentence",
  },
  {
    url: UsersRoutes.main,
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
