import { type } from "@testing-library/user-event/dist/type";

const Input = ({ label, name, formik, type = "text" }) => {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...formik.getFieldProps(name)}
        name={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className="errors">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
