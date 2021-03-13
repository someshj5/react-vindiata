import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getAllTimeEntries } from "../service/taskService";
import TaskAdd from "./TaskAdd";

export default function TaskList() {
  const { __aT__ } = sessionStorage;
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState(null);
  // const [deletemode, setdeletemode] = useState(false);
  // const [createMode, setcreateMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  // const [updateMode, setUpdateMode] = useState(false);

  const getTaskList = async () => {
    const resp = await getAllTimeEntries(__aT__);
    if (resp.data) {
      setTaskList(resp.data);
    }
  };

  const handleModal = (employee, e) => {
    setModal(!modal);
    if (employee !== null) {
      // setSelectedEmployee(employee);
    }
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

  // const handleDelete = async (employee, e) => {
  //   const { id } = employee;

  //   const filtered = taskList.filter((emp) => {
  //     emp.id = id;
  //   });
  //   setTaskList(filtered);
  //   try {
  //     setIsFetching(true);
  //     const resp = await deleteTask(id, __aT__);
  //     if (resp) {
  //       setIsFetching(false);
  //       setdeletemode(true);
  //     }
  //   } catch (error) {
  //     setIsFetching(false);
  //   }
  // };

  const handleEdit = (employee, e) => {
    // setUpdateMode(true);
    handleModal(employee, e);
  };

  useEffect(() => {
    getTaskList();
  });

  // useEffect(() => {
  //   getTaskList();
  // }, []);

  // useEffect(() => {
  //   getTaskList();
  // }, []);

  // useEffect(() => {
  //   getTaskList();
  // }, []);

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
            <span onClick={(e) => console.log(e)}>
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
    // setSelectedEmployee(null);
    if (resp === "updated") {
      // setUpdateMode(true);
    }
    if (resp) {
      setIsFetching(false);
    }
  }
  const handleAdd = (e) => {
    // setcreateMode(true);
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
