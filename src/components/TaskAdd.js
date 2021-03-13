import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createTask, getAllProjects, updateTask } from "../service/taskService";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

export default function TaskAdd({ handleModalClose }) {
  const history = useHistory();
  let defaultFormValues = {
    name: "",
    project: "",
    start_time: new Date(),
    end_time: new Date(),
    start: null,
    finish: null,
  };
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isFetching, setIsFetching] = useState(false);
  const [projects, setProjects] = useState([]);
  let defaultValues = {
    start_time: new Date(),
    end_time: "",
  };
  const [dates, setDates] = useState({ defaultValues });

  const getProjectsList = async () => {
    const { __aT__ } = sessionStorage;
    let projectList = await getAllProjects(__aT__);
    if (projectList.data) {
      setProjects(projectList.data);
      console.log(projectList.data, "projectList.data");
    }
  };

  const projectsArr = projects.map((proj) => {
    return <option value={proj[0]}>{proj[1]}</option>;
  });

  useEffect(() => {
    getProjectsList();
  }, []);

  const handleSubmit = async (e) => {
    try {
      setIsFetching(true);
      e.preventDefault();
      const { __aT__ } = sessionStorage;
      let task = {
        name: formValues.name,
        project: formValues.project,
        start_time: formValues.start_time.toISOString(),
        end_time: formValues.end_time.toISOString(),
        created_at: new Date().toISOString(),
        start: formValues.start,
        finish: formValues.finish,
      };

      const resp = await createTask(task, __aT__);
      if (resp.data) {
        setIsFetching(false);
        handleModalClose(resp);
        history.push("/tasks");
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

  const handleSelect = (e) => {
    setFormValues({
      ...formValues,
      start_time: e,
    });
  };

  const handleEndTime = (e) => {
    setFormValues({
      ...formValues,
      end_time: e,
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
                <h2>{("" && <b>Edit Task</b>) || <b>Add Task</b>}</h2>
              </center>
            </legend>
            <br />
            <div class="form-group">
              <label class="col-md-4 control-label">Task name</label>
              <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-user"></i>
                  </span>
                  <input
                    onChange={handleChange}
                    name="name"
                    value={formValues.name}
                    placeholder="task Name"
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-4 control-label">Projects</label>
              <div class="col-md-4 selectContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-list"></i>
                  </span>
                  <select
                    onChange={handleChange}
                    name="project"
                    class="form-control selectpicker"
                  >
                    {projectsArr && projectsArr}
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-4 control-label">Start Time</label>
              <div className="col-md-4 inputGroupContainer">
                <DatePicker
                  onChange={handleSelect}
                  value={formValues.start_time}
                />
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">End Time</label>
              <div className="col-md-4 inputGroupContainer">
                <DatePicker
                  onChange={handleEndTime}
                  value={formValues.end_time}
                />
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
