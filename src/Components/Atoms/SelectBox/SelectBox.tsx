import React from "react";
import Select, { StylesConfig } from "react-select";
type props = {
  options: { value: string; label: string }[];
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

  return (
    <Select
      options={props.options}
      styles={customStyles}
      isSearchable={false}
      defaultValue={props.options[0]}
    />
  );
}

export default SelectBox;
