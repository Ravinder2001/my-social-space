import React, { ChangeEvent, Dispatch } from "react";
import Select, { StylesConfig } from "react-select";

type props = {
  options: { value: string; label: string }[];
  setVisibilityOptions: (newValue: OptionType) => void;
  value: { value: string; label: string };
};
type OptionType = {
  value: string;
  label: string;
};
function SelectBox(props: props) {
  const customStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      width: "150px",
      fontSize: "14px",
      //   fontWeight: "bold",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: "rgb(3, 28, 91) ",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: state.isSelected ? "#007bff" : "#f4f4f4",
      },
    }),
    // Add more styles for other components like dropdown indicator, menu, etc.
  };
  const handleSelectChange = (newValue: any) => {
    props.setVisibilityOptions(newValue);
  };

  return (
    <Select
      options={props.options}
      styles={customStyles}
      isSearchable={false}
      value={props.value}
      onChange={handleSelectChange}
    />
  );
}

export default SelectBox;
