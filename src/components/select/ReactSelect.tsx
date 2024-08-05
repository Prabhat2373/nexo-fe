import Select, { GroupBase, Props, PropsValue } from "react-select";
import React from "react";
import classNames from "classnames";

// type Props = ;
const controlStyles = {
  base: "border rounded-sm bg-white dark:bg-background-light dark:border-0 hover:cursor-pointer dark:shadow-lg",
  focus: "border-primary-600 ring-1 ring-primary-500 bg-white",
  nonFocus: "border-gray-300 hover:border-gray-400",
  notAllowed: "cursor-not-allowed opacity-50 bg-gray-50",
};
const placeholderStyles = "text-gray-500 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5 ";
const valueContainerStyles = "p-1 gap-1 ";
const singleValueStyles = "leading-7 ml-1 ";
const multiValueStyles =
  " border border-border-foreground_100  rounded-sm items-center py-0.5 pl-2 pr-1 gap-1.5 dark:bg-background-medium dark:border-0 multi-select";
const multiValueLabelStyles =
  "leading-6 py-0.5 dark:text-white bg-white dark:bg-background-medium";
const multiValueRemoveStyles =
  "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-sm dark:bg-background-light dark:border-0 dark:text-white";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
  "text-gray-500 p-1 rounded-sm hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "";
const dropdownIndicatorStyles =
  "p-1 hover:bg-gray-100 text-gray-500 rounded-sm hover:text-black";
const menuStyles =
  "mt-2 border border-gray-200 bg-white rounded-sm dark:bg-background-light dark:border-0 pb-3";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm bg-white";
const optionStyles = {
  default: "multi-select dark:bg-background-medium",
  base: "hover:cursor-pointer px-3 py-2 dark:bg-background-light bg-white  dark:text-gray-400 ",
  focus: "bg-gray-100 active:bg-gray-200 bg-white dark:bg-background-light",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border dark:border-0 border-dashed border-gray-200 rounded-sm dark:bg-background-light dark:text-gray-200";

const formatOptionLabel = ({ value, label }) => (
  <div className="react-select-option" data-value={value}>
    {label}
  </div>
);

// function ReactSelect({ ...props }: Props) {
function ReactSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select
      // menuPortalTarget={document.querySelector('html')}

      instanceId={"id"}
      unstyled
      formatOptionLabel={formatOptionLabel}
      menuPosition="fixed"
      menuPlacement="auto"
      menuPortalTarget={
        typeof document !== "undefined"
          ? document?.getElementsByClassName(
              "fixed inset-0 z-50 flex bg-black bg-opacity-50 transition-all duration-100 justify-end"
            )[0]
          : "fixed inset-0 z-50 flex bg-black bg-opacity-50 transition-all duration-100 justify-end"
      }
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        menuPortal: (styles) => ({ ...styles, zIndex: 100 }), //  >= dialog's z-index
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
        menu: (base) => ({
          ...base,
          zIndex: 100,
        }),

        // portal: (base) => ({
        //   ...base,
        //   zIndex: 9999, // Adjust the z-index as needed
        // }),
      }}
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          classNames(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            isDisabled ? controlStyles.notAllowed : "",
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          classNames(
            optionStyles.default,
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),

        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      {...props}
    />
  );
}

export default ReactSelect;
