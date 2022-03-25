import React from "react";
const CheckBoxInput = ({ label, name, formik, checkBoxOptions }) => {
  return (
    <div className="formControl">
      {checkBoxOptions.map((item) => (
        <React.Fragment key={item.id}>
          <input
            type="checkbox"
            id={item.value}
            name={name}
            value={item.value}
            checked={formik.values[name].includes(item.value)}
            onChange={formik.handleChange}
          />
          <label htmlFor={item.value}>{item.label}</label>
          {formik.errors[name] && formik.touched[name] && (
            <div className="errors">{formik.errors[name]}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckBoxInput;
