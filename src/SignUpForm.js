import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "نام کاربری اشتباه میباشد";
  }

  if (!values.email) {
    errors.email = "ایمیل وارد شده اشتباه میباشد ";
  }
  if (!values.password) {
    errors.password = "رمز عبور اشتباه میباشد";
  }

  return errors;
};
const onSubmit = (values) => {
  console.log(values);
};

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate, // اعتبار سنجی میکنه بر اساس اروری که نوشته میشه
  });
  console.log(formik.errors);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>نام کاربری</label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
          />
          {formik.errors.name && <div className="errors">{formik.errors.name}</div>}
        </div>
        <div className="formControl">
          <label>ایمیل</label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
          {formik.errors.email && <div className="errors">{formik.errors.email}</div>}
        </div>
        <div className="formControl">
          <label>رمز عبور</label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
          />
          {formik.errors.password && <div className="errors">{formik.errors.password}</div>}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
