import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
import React from "react";
import AddMenuSheetFormContainer from "./form/AddMenuSheetFormContainer";
import { useDataTableContext } from "@/contexts/app/DataTableContext";

const AddMenuSheetContainer = ({ isOpen, hide }) => {
  const { refetch } = useDataTableContext();
  const onSuccess = () => {
    hide();
    refetch?.();
  };
  return (
    <Sheet open={isOpen} onOpenChange={hide}>
      {/* <SheetTrigger>Open</SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Menu</SheetTitle>
        </SheetHeader>
        <AddMenuSheetFormContainer onSuccess={onSuccess} />
      </SheetContent>
    </Sheet>
  );
};

export default AddMenuSheetContainer;
