import React from "react";
const RadioInput = ({ label, name, formik, RadioOptions }) => {
  return (
    <div className="formControl">
      {RadioOptions.map((item) => (
        <React.Fragment key={item.id}>
          <input
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            checked={formik.values.gender === item.value}
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

export default RadioInput;
