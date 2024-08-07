"use client";
import TablesContainer from "@/containers/table/TablesContainer";
import { WithDataTable } from "@/hoc/app/table/WithDataTable";
import React from "react";

const TablesIndex = () => {
  return (
    <WithDataTable>
      <TablesContainer />
    </WithDataTable>
  );
};

export default TablesIndex;
