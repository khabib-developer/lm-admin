import { Navigate, Route, Routes } from "react-router";
import {
  ChatRoutes,
  GlobalVariablesRoutes,
  PaymentRoutes,
  ProperNounsRoute,
  SentenceRoutes,
  TermsRoute,
  UsersRoutes,
} from "../6.shared";
import { Sentence } from "./Sentence";
import { Users } from "./Users";
import { GlobalVariables } from "./Variables";
import { Chat } from "./Chat";
import { Payment } from "./Payment";
import { SentenceTable } from "../4.features";
import { Terms } from "./Terms";
import { ProperNounsPage } from "./ProperNouns";

export const Pages = () => {
  return (
    <Routes>
      <Route path={SentenceRoutes.main} element={<Sentence />}>
        <Route path={SentenceRoutes.new} element={<SentenceTable />} />
        <Route
          path={SentenceRoutes.has_proper_noun}
          element={<SentenceTable />}
        />
        <Route path={SentenceRoutes.processing} element={<SentenceTable />} />
        <Route path={SentenceRoutes.done} element={<SentenceTable />} />
        <Route path={SentenceRoutes.wrong} element={<SentenceTable />} />
        <Route path={SentenceRoutes.waiting} element={<SentenceTable />} />
        <Route path={SentenceRoutes.mock} element={<SentenceTable />} />
      </Route>
      <Route path={ProperNounsRoute} element={<ProperNounsPage />}></Route>
      <Route path={UsersRoutes.main} element={<Users />}></Route>
      <Route
        path={GlobalVariablesRoutes.main}
        element={<GlobalVariables />}
      ></Route>
      <Route path={PaymentRoutes.main} element={<Payment />}></Route>
      <Route path={ChatRoutes.main} element={<Chat />}></Route>
      <Route path={TermsRoute} element={<Terms />}></Route>
      <Route
        path="*"
        element={
          <Navigate to={SentenceRoutes.new.replace(":offset", "1")} replace />
        }
      />
    </Routes>
  );
};
