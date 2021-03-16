import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getAllProjects,
  getTaskById,
  updateTask,
} from "../service/taskService";
import DatePicker from "react-date-picker";
// import TimePicker from "react-time-picker";
import moment from 'moment'

export default function TaskDetails({ handleModalClose }) {
  const [task, setTask] = useState(null);
  const history = useHistory();
  const params = useParams();

  const [isFetching, setIsFetching] = useState(false);
  const [projects, setProjects] = useState([]);
  const [taskETA,setTaskETA] = useState({started:null,finished:null})

  const getTask = async () => {
    const { __aT__ } = sessionStorage;
    const { id } = params;
    try {
      setIsFetching(true);
      let response = await getTaskById(id, __aT__);
      if (response.data) {
        setTask(response.data.data);
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
    }
  };

  const projectsArr = projects.map((proj,idx) => {
    return <option key={idx} value={proj[0]} 
     >{proj[1]}</option>;
  });

  useEffect(() => {
    getTask();
    getProjectsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let defaultFormValues = {
    name: task && task.name,
    project: (task && task.project),
    start_time: task && task.start_time,
    end_time: task && task.end_time,
    start: task && task.start,
    finish: task && task.finish,
  };

  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formValues,'formValues')
      const {id} = task
      console.log(id,task)

      setIsFetching(true);
      if (task.start === null ){
        setTaskETA({...taskETA,
          started:new Date().toISOString()
        })
      }
      else if (task.start !== null){
        setTaskETA({
          ...taskETA,
          finished:new Date().toISOString()
        })
      }
      const { __aT__ } = sessionStorage;
      let taskValues = {
        name: task &&task.name,
        project: task && task.project,
        start_time: task && task.start_time,
        end_time: task && task.end_time,
        created_at: task && task.created_at,
        start: taskETA.started,
        finish: taskETA.finished,
      };
      console.log(taskValues, taskETA,'taskValues')
      const resp = await updateTask(id,taskValues, __aT__);
      if (resp.data) {
        setIsFetching(false);
        // handleModalClose(resp);
        setTimeout(() => {
          history.push("/tasks");
          
        }, 2000);
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
    <div className="container bg-white p-5 ">
      <div className="container  pt-3 px-3 mb-5 ">
        {(!isFetching && (
            <fieldset>
              <legend>
                <center>
                  <h2>
                    <b>Task Details</b>
                  </h2>
                </center>
              </legend>
              <br />
              <div className="form-group">
                <label className="col-md-4 control-label">Task name</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <input
                      onChange={handleChange}
                      name="name"
                      value={(task && task.name) || ""}
                      placeholder="task Name"
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">Projects</label>
                <div className="col-md-4 selectContainer">
                  <div className="input-group">
                    <select
                      onChange={handleChange}
                      name="project"
                      className="form-control selectpicker"
                      defaultValue={task && task.project}
                    >
                      {projectsArr && projectsArr}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-4 control-label">Start Time</label>
                <div className="col-md-4 inputGroupContainer">
                  <DatePicker
                    // onChange={handleSelect}
                    value={task && moment(task.start_time, 'YYYY-MM-DD') }
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">End Time</label>
                <div className="col-md-4 inputGroupContainer">
                  <DatePicker
                    // onChange={handleEndTime}
                    value={task && moment(task.end_time, 'YYYY-MM-DD')}
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-6 login-btm login-button">
                <button onClick={handleSubmit} type="submit" className="btn w-50 btn-outline-primary">
                  {task && task.start === null ? "Start" : "Finish"}
                </button> 
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label"></label>
              </div>
            </fieldset>
          // </form>
        )) || <div className="container-fluid">"Please wait "</div>}
      </div>
    </div>

    // </div>
  );
}
