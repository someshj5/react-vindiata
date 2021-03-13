import React, { useState } from "react";
import { useHistory } from "react-router";
import { createEmployee, updateEmployee } from "../service/employeeService";

export default function EmployeeAdd({
  selectedEmployee,
  handleModalClose,
  setUpdateMode,
}) {
  const history = useHistory();
  let defaultFormValues = {
    first_name: (selectedEmployee && selectedEmployee.first_name) || "",
    last_name: (selectedEmployee && selectedEmployee.last_name) || "",
    mobile: (selectedEmployee && selectedEmployee.mobile) || "",
    department: (selectedEmployee && selectedEmployee.department) || "",
  };
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsFetching(true);
      e.preventDefault();
      const { __aT__ } = sessionStorage;
      if (selectedEmployee === null) {
        const resp = await createEmployee(formValues, __aT__);
        if (resp.data) {
          setIsFetching(false);
          handleModalClose(resp);
          history.push("/employee");
        }
      } else if (selectedEmployee) {
        const { id } = selectedEmployee;
        const resp = await updateEmployee(formValues, id, __aT__);
        if (resp.data) {
          setIsFetching(false);
          handleModalClose("updated");
        }
      }
    } catch (error) {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid p-5 bg-white">
      <div className="text-right" onClick={handleModalClose}>
        <i className="fa fa-times fa-2x" />
      </div>
      <div class="container p-3 border border-radius-8">
        <form
          onSubmit={handleSubmit}
          class="well form-horizontal"
          action=" "
          method="post"
          id="contact_form"
        >
          <fieldset>
            <legend>
              <center>
                <h2>
                  {(selectedEmployee && <b>Edit Employee</b>) || (
                    <b>Add Employee</b>
                  )}
                </h2>
              </center>
            </legend>
            <br />
            <div class="form-group">
              <label class="col-md-4 control-label">First Name</label>
              <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-user"></i>
                  </span>
                  <input
                    onChange={handleChange}
                    name="first_name"
                    value={selectedEmployee && selectedEmployee.first_name}
                    placeholder="First Name"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-4 control-label">Last Name</label>
              <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-user"></i>
                  </span>
                  <input
                    value={selectedEmployee && selectedEmployee.last_name}
                    onChange={handleChange}
                    name="last_name"
                    placeholder="Last Name"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-4 control-label">Department / Office</label>
              <div class="col-md-4 selectContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-list"></i>
                  </span>
                  <select
                    onChange={handleChange}
                    name="department"
                    name="department"
                    class="form-control selectpicker"
                  >
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value=""
                    >
                      Select your Department/Office
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="Engineering"
                    >
                      Department of Engineering
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="Agriculture"
                    >
                      Department of Agriculture
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="Accounts"
                    >
                      Accounting Office
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="Tresurer"
                    >
                      Tresurer's Office
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="MPDC"
                    >
                      MPDC
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="MCTC"
                    >
                      MCTC
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="MCR"
                    >
                      MCR
                    </option>
                    <option
                      selected={
                        (selectedEmployee && selectedEmployee.department) ||
                        null
                      }
                      value="Tourism"
                    >
                      Tourism Office
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-4 control-label">Contact</label>
              <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-envelope"></i>
                  </span>
                  <input
                    onChange={handleChange}
                    value={selectedEmployee && selectedEmployee.mobile}
                    name="mobile"
                    placeholder="mobile number"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 login-btm login-button">
              <button type="submit" className="btn w-50 btn-outline-primary">
                {isFetching ? <i className="fa fa-cog fa-spin" /> : "ADD"}
              </button>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label"></label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>

    // </div>
  );
}
