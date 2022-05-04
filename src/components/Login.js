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
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const rememberRef = React.useRef();
  const handleLoginAction = (token, userinfo) => {
    dispatch({
      type: ActionTypes.LOGIN_USER,
      token: token,
      currentUser: userinfo,
    });
  };
  const formsubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const remember = rememberRef.current.checked;
    userService.login(username, password).then((result) => {
      //console.log(result);
      if (result.data.errorCode === 0) {
        //console.log(result.data.token);
        handleLoginAction(result.data.token, result.data.data);

        if (remember) {
          const newDatainfo = {};
          newDatainfo["username"] = username;
          newDatainfo["password"] = password;
          newDatainfo["remember"] = true;

          let CryptoJS = require("crypto-js");

          let newDatainfo_crypo = CryptoJS.AES.encrypt(
            JSON.stringify(newDatainfo),
            "&^%#(_*("
          ).toString();

          localStorage.setItem("Datainfo", JSON.stringify(newDatainfo_crypo));
        } else {
          localStorage.removeItem("Datainfo");
        }
        navigate("/");
      } else {
        setmessage(result.data.message);
      }
    });
  };
  let Datainfo_r = {};
  const data_local = localStorage.getItem("Datainfo");
  if (data_local != null) {
    let CryptoJS = require("crypto-js");
    const Datainfo_de = CryptoJS.AES.decrypt(
      JSON.parse(data_local),
      "&^%#(_*("
    );
    Datainfo_r = JSON.parse(Datainfo_de.toString(CryptoJS.enc.Utf8));
  }

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
                    defaultValue={
                      Datainfo_r != null && Datainfo_r.username
                        ? Datainfo_r.username
                        : ""
                    }
                    ref={usernameRef}
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
                    defaultValue={
                      Datainfo_r != null && Datainfo_r.password
                        ? Datainfo_r.password
                        : ""
                    }
                    ref={passwordRef}
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
                        defaultChecked={
                          Datainfo_r != null && Datainfo_r.remember
                            ? true
                            : false
                        }
                        type="checkbox"
                        id="remember"
                        ref={rememberRef}
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
