import { RootState } from "@/services/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import Cookies from "js-cookie";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers) => {
    // const token = (getState() as RootState).token?.token;
    const token = Cookies.get("token");
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
