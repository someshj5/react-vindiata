import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { deleteTask, getAllTimeEntries } from "../service/taskService";

export default function TaskList() {
  const history = useHistory();
  const { __aT__ } = sessionStorage;
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const getTaskList = async () => {
    const resp = await getAllTimeEntries(__aT__);
    if (resp && resp.data) {
      const { data } = resp.data
      setTaskList(data);
    }
  };

  const handleModal = (employee, e) => {
    setModal(!modal);
  };

  const handleDelete = async (e, id) => {
    try {
      setIsFetching(true)
      const response = await deleteTask(id, __aT__)
      if (response.data) {
        alert("Deleted successfully")
        setIsFetching(false)
        setTimeout(() => {
          history.push('/tasks')
        }, 2000);
      }
    } catch (error) {
      setIsFetching(false)
    }

  }
  const customStyles = {
    content: {
      width: "100%",
      top: "10%",
      left: "0%",
      right: "0%",
      bottom: "10%",
      height: "100%",
    },
  };

  toast('🦄 Wow so easy!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const TasksArr =
    taskList.length > 0 &&
    taskList.map((task, idx) => {
      let name = task.name
      let project = task.project
      let created = new Date(task.start_time).toString()
      return (
        <tr key={idx}>
          <td>{name}</td>
          <td>{project}</td>
          <td>{created}</td>
          <td>
            <span onClick={(e) => handleEdit(e, task.id)}>
              <i className="fa fa-edit 2x " />
            </span>
            <span
              onClick={(e) => handleDelete(e, task.id)}
              className="ml-2">
              <i className="fa fa-trash 2x " />
            </span>
          </td>
        </tr>
      )
    })

  const handleEdit = (e, id) => {
    history.push(`/task/${id}`);
  };

  useEffect(() => {
    getTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  function handleModalClose(resp) {
    setModal(false);
    if (resp === "updated") {
    }
    if (resp) {
      setIsFetching(false);
    }
  }
  const handleAdd = (e) => {
    history.push('/task-add')
  };

  return (
    <div>
      <h1>
        <span className=" yellow">Time Entries</span>
      </h1>
      <div>
        <span>
          <button
            disabled={!__aT__}
            onClick={(e) => handleAdd(e)}
            className="btn btn-outline-primary offset-5 border-radius-8"
          >
            ADD TASK
          </button>
        </span>
        <span>
          <button
            disabled={!__aT__}
            onClick={(e) => history.push("tasks-by-date")}
            className="btn btn-outline-primary mx-2 border-radius-8"
          >
            List by Date
          </button>
        </span>
      </div>

      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>Name</h1>
            </th>
            <th>
              <h1>Project</h1>
            </th>
            <th>
              <h1>Created at</h1>
            </th>
            <th>
              <h1>Action</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {__aT__ && taskList.length > 0 ? TasksArr
            : <td>Sorry no data </td>
          }
        </tbody>
      </table>
    </div>
  );
}
