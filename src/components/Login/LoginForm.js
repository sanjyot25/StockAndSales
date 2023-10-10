import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
export const wcClient = "5465977";
export const storageData = "user-info";

function LoginForm(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [isLoggedin, setIsLoggedin] = useState(false);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    let item = {
      userId: data.username,
      password: data.password,
      wclientid: wcClient.toString(),
    };

    fetch("https://popsv3.relysoft.in/api/Com/Authenticate/AuthTokenCom/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.isSuccess) {
          navigate("/home", { replace: true });
          localStorage.setItem("user-info", JSON.stringify(result));
          setIsLoggedin(true);
        } else {
          throw result;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="login_form_container">
        <h1 className=" ">pharmastockandsale.com</h1>
        <h6 className="">Log in</h6>
        <div className="">
          <input
            type="text"
            name="username"
            placeholder="email"
            onChange={changeHandler}
            className="form-control"
            value={data.username}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={changeHandler}
            className="form-control"
            value={data.password}
          />
          <br />
          <input
            type="text"
            placeholder="client ID"
            onChange={(e) => wcClient}
            className="form-control"
          />
          <br />

          <button onClick={onSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
