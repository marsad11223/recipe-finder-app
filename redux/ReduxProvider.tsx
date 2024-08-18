"use client";

/* Core */
import { Provider } from "react-redux";
import { reduxStore } from "./store";

/* Instruments */

export const ReduxProvider = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};
