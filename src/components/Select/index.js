import React from "react";
import Select from "react-select";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

export default ({ name, options, formik: { values, setFieldValue } }) => {
  return (
    <Select
      value={values[name]}
      options={options}
      isMulti
      styles={styles}
      isClearable={values[name].some((v) => !v.isFixed)}
      name
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(value, meta) => {
        setFieldValue(name, value);
      }}
    />
  );
};
