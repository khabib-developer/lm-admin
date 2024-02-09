export enum SentenceRoutes {
  main = "/admin/sentence",
  new = "/admin/sentence/new/:offset",
  processing = "/admin/sentence/processing/:offset",
  waiting = "/admin/sentence/waiting/:offset",
  wrong = "/admin/sentence/wrong/:offset",
  done = "/admin/sentence/done/:offset",
  mock = "/admin/sentence/mock/:offset",
  item = "/admin/sentence/:id",
}

export enum UsersRoutes {
  main = "/admin/users",
}

export enum GlobalVariablesRoutes {
  main = "/admin/globalVariables",
}

export enum PaymentRoutes {
  main = "/admin/payment",
}

export enum ChatRoutes {
  main = "/admin/chat",
}

export const TermsRoute = "/admin/terms";
