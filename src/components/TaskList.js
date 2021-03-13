import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router";
import { getAllTimeEntries } from "../service/taskService";
import TaskAdd from "./TaskAdd";

export default function TaskList() {
  const history = useHistory();
  const { __aT__ } = sessionStorage;
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);

  const [isFetching, setIsFetching] = useState(false);

  const getTaskList = async () => {
    const resp = await getAllTimeEntries(__aT__);
    if (resp.data) {
      setTaskList(resp.data);
    }
  };

  const handleModal = (employee, e) => {
    setModal(!modal);
  };

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

  const handleEdit = (id) => {
    history.push(`/task/${id}`);
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const TasksArr =
    taskList &&
    taskList.map((task, idx) => {
      let name = task.name;
      let number = task.project;
      return (
        <tr key={idx}>
          <td>{name}</td>
          <td>{number}</td>
          <td>{""}</td>
          <td>
            <span onClick={(e) => handleEdit(task.id)}>
              <i className="fa fa-edit 2x " />
            </span>
            <span onClick={(e) => console.log(e)} className="ml-2">
              <i className="fa fa-trash 2x " />
            </span>
          </td>
        </tr>
      );
    });

  function handleModalClose(resp) {
    setModal(false);
    if (resp === "updated") {
    }
    if (resp) {
      setIsFetching(false);
    }
  }
  const handleAdd = (e) => {
    setIsFetching(true);
    handleModal(null, e);
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
      </div>

      <table class="container">
        <thead>
          <tr>
            <th>
              <h1>Name</h1>
            </th>
            <th>
              <h1>Project</h1>
            </th>
            <th>
              <h1>Department</h1>
            </th>
            <th>
              <h1>Action</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {(__aT__ && taskList.length > 0 && TasksArr) || (
            <h3 className="">
              "Sorry Please insert the Employee or Login to see employee detail"
            </h3>
          )}
        </tbody>
      </table>
      <Modal
        className="container pt-5"
        isOpen={modal}
        onRequestClose={(e) => handleModal(null, e)}
        style={customStyles}
        ariaHideApp={false}
        shouldFocusAfterRender={true}
      >
        <TaskAdd
          handleModal={handleModal}
          handleModalClose={handleModalClose}
        />
      </Modal>
    </div>
  );
}
