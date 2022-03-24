import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConformation: "",
  gender: "0",
};

const onSubmit = (values) => {
  console.log(values);
};
const validationSchema = yup.object({
  name: yup
    .string()
    .required("وارد کردن نام کاربری الزامی میباشد")
    .min(6, "حداقل 6 کاراکتر"),
  email: yup
    .string()
    .email("ایمیل وارد شده اشتباه میباشد")
    .required("وارد کردن ایمیل الزامی میباشد"),
  phoneNumber: yup
    .string()
    .required("وارد کردن شماره تماس الزامی میباشد")
    .matches(/^[0-9]{11}$/, "حداقل 11 کراکتر وارد کنید")
    .nullable(),
  password: yup
    .string()
    .required("وارد کردن رمز عبور الزامی میباشد")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  passwordConformation: yup
    .string()
    .required("وارد کردن رمز عبور الزامی میباشد")
    .oneOf([yup.ref("password"), null], "رمز عبور مطابقت نمیکند"),
  gender: yup.string().required("جنسیت خود را مشخص کنید"),
});

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: "true", // vase button karbord dare k input true nashe button disbled mimone
  });
  console.log(formik);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label htmlFor="name">نام کاربری</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="errors">{formik.errors.name}</div>
          )}
        </div>
        <div className="formControl">
          <label htmlFor="email">ایمیل</label>
          <input
            id="email"
            type="text"
            {...formik.getFieldProps("email")}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="errors">{formik.errors.email}</div>
          )}
        </div>

        <div className="formControl">
          <label htmlFor="phoneNumber">شماره همراه</label>
          <input
            id="phoneNumber"
            type="text"
            {...formik.getFieldProps("phoneNumber")}
            name="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="errors">{formik.errors.phoneNumber}</div>
          )}
        </div>

        <div className="formControl">
          <label htmlFor="password">رمز عبور</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="errors">{formik.errors.password}</div>
          )}
        </div>

        <div className="formControl">
          <label htmlFor="passwordConformation">تکرار رمز عبور</label>
          <input
            id="passwordConformation"
            type="password"
            {...formik.getFieldProps("passwordConformation")}
            name="passwordConformation"
          />
          {formik.errors.passwordConformation &&
            formik.touched.passwordConformation && (
              <div className="errors">{formik.errors.passwordConformation}</div>
            )}
        </div>
        <div className="formControl">
          <input
            type="radio"
            id="0"
            name="gender"
            value="0"
            checked={formik.values.gender === "0"}
            onChange={formik.handleChange}
          />
          <label htmlFor="0">مرد</label>
          <input
            type="radio"
            id="1"
            name="gender"
            value="1"
            checked={formik.values.gender === "1"}
            onChange={formik.handleChange}
          />
          <label htmlFor="1">زن</label>
        </div>
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
