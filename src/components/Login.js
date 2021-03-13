import React, { useState } from "react";
import Navbar from "./Navbar";
import { loginUser } from "../service/userService";
import { useHistory } from "react-router-dom";

export default function Login() {
  const defaultFormValues = {
    username: "",
    password: "",
  };

  const history = useHistory();
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      let response = await loginUser(formValues);
      if (response.data) {
        sessionStorage.setItem("__aT__", response.data);
        setIsFetching(false);
        history.push("/");
      } else {
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
    }
  };
  return (
    <>
      <Navbar title="Register" />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">Login</div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-control-label">USERNAME</label>
                    <input
                      onChange={handleChange}
                      name="username"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input
                      onChange={handleChange}
                      name="password"
                      type="password"
                      className="form-control"
                    />
                  </div>

                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-6 login-btm login-text"></div>
                    <div className="col-lg-6 login-btm login-button">
                      <button
                        type="submit"
                        className="btn w-50 btn-outline-primary"
                      >
                        {isFetching ? (
                          <i className="fa fa-cog fa-spin" />
                        ) : (
                          "LOGIN"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
