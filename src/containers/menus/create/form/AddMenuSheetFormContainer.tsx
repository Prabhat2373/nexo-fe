import Asterisk from "@/components/form/Asterisk";
import InputError from "@/components/form/InputError";
import SheetFormContainer from "@/components/form/sheet/SheetFormContainer";
import ReactSelect from "@/components/select/ReactSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddMenuMutation,
  useGetPredefinedMenusQuery,
} from "@/services/rtk/setupApi";
import { isSuccess } from "@/utils/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo } from "react";
import { toast } from "react-toastify";

const AddMenuSheetFormContainer = ({ onSuccess }) => {
  const { data: predefinedMenus } = useGetPredefinedMenusQuery("");
  const [addMenu, { isLoading }] = useAddMenuMutation();
  console.log("predefinedMenus", predefinedMenus);
  const initialValues = {
    name: "",
    description: "",
    price: "",
    predefined: false,
  };
  const handleAddMenu = async (data) => {
    console.log("data", data);
    const res = await addMenu(data);

    if (isSuccess(res)) {
      toast.success(res?.data?.message);
      onSuccess();
    }
  };

  const menuOptions = useMemo(() => {
    return predefinedMenus?.data?.map((menu) => {
      return {
        label: menu?.name,
        value: menu?._id,
        meta: menu,
      };
    });
  }, [predefinedMenus?.data]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleAddMenu}>
      {({ setFieldValue, values }) => {
        return (
          <SheetFormContainer>
            <div className="flex flex-col gap-3 ">
              <div>
                <Label>Select Predefined Menu</Label>
                <ReactSelect
                  options={menuOptions || []}
                  onChange={(option) => {
                    if (!!option) {
                      setFieldValue("name", option?.meta?.name);
                      setFieldValue("description", option?.meta?.description);
                      setFieldValue("predefined", !!option);
                    } else {
                      setFieldValue("name", "");
                      setFieldValue("description", "");
                      setFieldValue("predefined", false);
                    }
                  }}
                  isClearable
                />
              </div>
              <div>
                <Label>
                  Name <Asterisk />
                </Label>
                <Field
                  as={Input}
                  name="name"
                  placeholder="Enter Name"
                  disabled={values?.predefined}
                />
                <ErrorMessage name="name" component={InputError} />
              </div>
              <div>
                <Label>Description</Label>
                <Field
                  as={Textarea}
                  name="description"
                  placeholder="Enter Description"
                  disabled={values?.predefined}
                />
                <ErrorMessage name="description" component={InputError} />
              </div>
              <div>
                <Label>Price</Label>
                <Field as={Input} name="price" placeholder="Enter Price" />
                <ErrorMessage name="price" component={InputError} />
              </div>
            </div>
            <div className="flex justify-end ">
              <Button className="w-full" isLoading={isLoading}>
                Save
              </Button>
            </div>
          </SheetFormContainer>
        );
      }}
    </Formik>
  );
};

export default AddMenuSheetFormContainer;
