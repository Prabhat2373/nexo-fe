"use client";

import CustomerIndexContainer from "@/containers/customers/CustomerIndexContainer";
import { WithDataTable } from "@/hoc/app/table/WithDataTable";
import React from "react";

const CustomersIndex = () => {
  return (
    <WithDataTable>
      <CustomerIndexContainer />
    </WithDataTable>
  );
};

export default CustomersIndex;
