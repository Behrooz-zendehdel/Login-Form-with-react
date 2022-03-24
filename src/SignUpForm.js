import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "وارد کردن نام کاربری الزامی میباشد";
  }

  if (!values.email) {
    errors.email = "،وارد کردن ایمیل الزامی میباشد";
  }
  if (!values.password) {
    errors.password = "وارد کردن رمز عبور الزامی میباشد";
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
  console.log("visited fields", formik.touched);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>نام کاربری</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="errors">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label>ایمیل</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="errors">{formik.errors.email}</div>
          )}
        </div>
        <div className="formControl">
          <label>رمز عبور</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="errors">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
