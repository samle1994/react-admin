// imrse
import React, { useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import ActionTypes from "./../store/actions";

const Login = () => {
  const [message, setmessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginAction = (token, userinfo) => {
    dispatch({
      type: ActionTypes.LOGIN_USER,
      token: token,
      currentUser: userinfo,
    });
  };
  const formsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;
    //console.log(username, password);
    //console.log(remember);
    userService.login(username, password).then((result) => {
      //console.log(result);
      if (result.data.errorCode === 0) {
        //console.log(result.data.token);
        handleLoginAction(result.data.token, result.data.data);

        if (remember) {
          localStorage.setItem("remember", true);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        } else {
          localStorage.removeItem("remember");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        navigate("/");
      } else {
        setmessage(result.data.message);
      }
    });
  };
  const remember_r = localStorage.getItem("remember");
  const username_r = localStorage.getItem("username");
  const password_r = localStorage.getItem("password");
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html">
              <b>Admin</b>
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Đăng nhập hệ thống</p>
              <p className="text-danger text-center">{message}</p>
              <form onSubmit={formsubmit}>
                <div className="input-group mb-3">
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Tài khoản"
                    defaultValue={remember_r ? username_r : ""}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    id="password"
                    defaultValue={remember_r ? password_r : ""}
                    className="form-control"
                    placeholder="Mật khẩu"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-7">
                    <div className="icheck-primary">
                      <input
                        defaultChecked={remember_r ? true : false}
                        type="checkbox"
                        id="remember"
                      />
                      <label htmlFor="remember">Nhớ mật khẩu</label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-5">
                    <button type="submit" className="btn btn-primary btn-block">
                      Đăng nhập
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
