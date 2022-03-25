import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectInput from "./common/SelectInput";
const RadioOptions = [
  { label: "مرد", value: "0" },
  { label: "زن", value: "1" },
];
const selectOptions = [
  { label: "کشور خود را انتخاب کنید", value: "" },
  { label: "ایران", value: "IR" },
  { label: "المان", value: "GER" },
  { label: "امریکا", value: "USA" },
  { label: "کانادا", value: "CND" },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConformation: "",
  gender: "",
  nationality: "",
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
  nationality: yup.string().required("کشور خود را انتخاب نکرده اید"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true, // vase button karbord dare k input true nashe button disbled mimone
    enableReinitialize: true,
  });
  console.log(formik);
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phoneNumber" label="phoneNumber" />
        <Input
          formik={formik}
          name="password"
          type="password"
          label="password"
        />
        <Input
          formik={formik}
          name="passwordConformation"
          type="password"
          label="passwordConformation"
        />
        <RadioInput formik={formik} name="gender" RadioOptions={RadioOptions} />
        <SelectInput
          selectOptions={selectOptions}
          formik={formik}
          name="nationality"
        />
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;