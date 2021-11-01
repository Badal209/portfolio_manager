import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import logo from "../assets/img/logo.svg";

import { routes } from "../route/route";
import { login } from "../store/actions/userActions";
import { loginAction } from "../store/slice/userSlice";
// import { singup } from "../store/actions/userActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    let loginValid = formValidation();
    console.log("Email", email);
    if (loginValid) {
      dispatch(login(email, password));
    }
  };
  useEffect(() => {
    if (user) {
      history.push(routes.dashboardPage);
    }
  }, [user]);
  if (user) {
    return <Redirect to={"/dashboard"} />;
  }
  const formValidation = () => {
    let formIsValid;
    if (!email) {
      setEmailError("Email is require !");
    } else if (!password) {
      setPasswordError("Password is require");
    } else {
      formIsValid = true;
    }
    return formIsValid;
  };

  return (
    <div className="middle-box text-center loginscreen animated fadeInDown login-design">
      <div className="login-center">
        <div>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <h3 className="welcome">Welcome to Portfolio Manager</h3>
        <form className="m-t" action="index.html" onSubmit={loginHandler}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Username"
              onChange={emailChangeHandler}
              value={email}
              required
            />
            {!email && emailError ? (
              <span className="form-text m-b-none">{emailError}</span>
            ) : null}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={passwordChangeHandler}
              value={password}
              required
            />
            {!password && passwordError ? (
              <span className="form-text m-b-none">{passwordError}</span>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn block full-width m-b btn-login"
            onClick={loginHandler}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
