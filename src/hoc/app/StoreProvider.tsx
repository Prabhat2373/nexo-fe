"use client";
import { store } from "@/services/store";
import React from "react";

// import { store } from "../store";
/* Core */
import { Provider } from "react-redux";

const StoreProvider = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default StoreProvider;
