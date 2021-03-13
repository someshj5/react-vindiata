import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getAllProjects,
  getTaskById,
  updateTask,
} from "../service/taskService";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

export default function TaskDetails({ handleModalClose }) {
  const [task, setTask] = useState(null);
  const history = useHistory();
  const params = useParams();
  let defaultFormValues = {
    name: (task && task.name) || "",
    project: (task && task.project) || "",
    start_time: task && task.start_time,
    end_time: task && task.end_time,
    start: task && task.start,
    finish: task && task.finish,
  };
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isFetching, setIsFetching] = useState(false);
  const [projects, setProjects] = useState([]);

  const getTask = async () => {
    const { __aT__ } = sessionStorage;
    const { id } = params;
    try {
      setIsFetching(true);
      let response = await getTaskById(id, __aT__);
      if (response.data) {
        setTask(response.data);
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
    }
  };

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
    getTask();
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

      const resp = await updateTask(task, __aT__);
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
    <div className="container-fluid bg-white p-5 ">
      <div class="container  pt-3 px-3 mb-5 ">
        {(task && (
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
                    <b>Edit Task</b>
                  </h2>
                </center>
              </legend>
              <br />
              <div class="form-group">
                <label class="col-md-4 control-label">Task name</label>
                <div class="col-md-4 inputGroupContainer">
                  <div class="input-group">
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
                  {task && task.start_time !== null ? "Start" : "Finish"}
                </button>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label"></label>
              </div>
            </fieldset>
          </form>
        )) || <div className="container-fluid">"Please wait "</div>}
      </div>
    </div>

    // </div>
  );
}
