import { baseQuery } from "@/utils/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "ordersApi",
  endpoints: (build) => ({
    getOrders: build.query({
      query: (args) => ({
        url: `restaurants/66af6a3fcc1a98de78e4016b/orders`,
        params: args,
      }),
    }),
  }),
});

export const { useLazyGetOrdersQuery } = ordersApi;
