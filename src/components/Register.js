import React, { useState } from "react";
import { registerUser } from "../service/userService";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

export default function Register() {
  const defaultFormValues = {
    email: "",
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
      let response = await registerUser(formValues);
      if (response.data) {
        setIsFetching(false);
        history.push("/login");
      } else {
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
    }
  };
  return (
    <>
      <Navbar title="Login" />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">Register</div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-control-label">EMAIL</label>
                    <input
                      onChange={handleChange}
                      name="email"
                      type="text"
                      className="form-control"
                    />
                  </div>
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
                          "REGISTER"
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
