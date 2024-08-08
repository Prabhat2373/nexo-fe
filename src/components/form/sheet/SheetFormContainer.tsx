import { Form } from "formik";
import React from "react";

const SheetFormContainer = ({ children }) => {
  return (
    <Form className="flex flex-col  h-full justify-between py-7">
      {children}
    </Form>
  );
};

export default SheetFormContainer;
