import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
export type TComponent = {
  children: React.ReactNode;
};
// eslint-disable-next-line react/display-name
export const RoutersProvider = ({ children }: TComponent) => (
  <BrowserRouter>
    <Suspense fallback="Loading...">{children}</Suspense>
  </BrowserRouter>
);
