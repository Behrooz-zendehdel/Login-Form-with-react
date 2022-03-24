import { useState } from "react";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = ({ target }) => {
      
    setUserData({ ...userData, [target.name]: target.value });
  };
  const submitHandler =(e)=>{
e.preventDefault()
      console.log("submitedd ...")
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="formControl">
          <label>name</label>
          <input
            type="text"
            onChange={changeHandler}
            value={userData.name}
            name="name"
          />
        </div>
        <div className="formControl">
          <label>email</label>
          <input
            type="text"
            onChange={changeHandler}
            value={userData.email}
            name="email"
          />
        </div>
        <div className="formControl">
          <label>password</label>
          <input
            type="text"
            onChange={changeHandler}
            value={userData.password}
            name="password"
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
