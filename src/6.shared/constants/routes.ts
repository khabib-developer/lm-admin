export enum SentenceRoutes {
  main = "/admin/sentence",
  new = "/admin/sentence/new/:offset",
  has_proper_noun = "/admin/sentence/has_proper_noun/:offset",
  processing = "/admin/sentence/processing/:offset",
  waiting = "/admin/sentence/waiting/:offset",
  wrong = "/admin/sentence/wrong/:offset",
  done = "/admin/sentence/done/:offset",
  mock = "/admin/sentence/mock/:offset",
}
export const ProperNounsRoute = "/admin/proper_nouns/:offset";

export enum UsersRoutes {
  main = "/admin/users/:offset",
}

export enum GlobalVariablesRoutes {
  main = "/admin/globalVariables",
}

export enum PaymentRoutes {
  main = "/admin/payment/:offset",
}

export enum ChatRoutes {
  main = "/admin/chat",
}

export const TermsRoute = "/admin/terms";
