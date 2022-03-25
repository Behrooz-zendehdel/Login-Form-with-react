import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectInput from "./common/SelectInput";
import CheckBoxInput from "./common/CheckBoxInput";
const RadioOptions = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];

const checkBoxOptions = [
  { label: "react.js", value: "react.js" },
  { label: "veu.js", value: "veu.js" },
];

const selectOptions = [
  { label: "check the nationality", value: "" },
  { label: "iran", value: "IR" },
  { label: "germany", value: "GER" },
  { label: "usa", value: "USA" },
  { label: "canada", value: "CND" },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConformation: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: "",
};

const onSubmit = (values) => {
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  // console.log(values);
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("required is name")
    .min(6, "required 6 characters"),
  email: yup
    .string()
    .email("is problem the email")
    .required("required is email"),
  phoneNumber: yup
    .string()
    .required("required is phone number")
    .matches(/^[0-9]{11}$/, "required 11 characters")
    .nullable(),
  password: yup
    .string()
    .required("required is password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters"
    ),
  passwordConformation: yup
    .string()
    .required("required is password")
    .oneOf([yup.ref("password"), null], "not found password"),
  gender: yup.string().required("required is gender"),
  nationality: yup.string().required("reauired is  nationality "),
  intrests: yup.array().min(1).required("reauirede one item"),
  terms: yup.boolean().oneOf([true], "see to terms ?"),
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
        <CheckBoxInput
          formik={formik}
          name="intrests"
          checkBoxOptions={checkBoxOptions}
        />
        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          checked={formik.values.terms}
          onChange={formik.handleChange}
        />
        <label htmlFor="terms">terms and conditions</label>
        {formik.errors.terms && formik.touched.terms && (
          <div className="errors">{formik.errors.terms}</div>
        )}
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
