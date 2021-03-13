import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { deleteEmployee, getAllEmployee } from "../service/employeeService";
import EmployeeAdd from "./EmployeeAdd";

export default function EmployeeList() {
  const { __aT__ } = sessionStorage;
  const [employeeList, setEmployeeList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deletemode, setdeletemode] = useState(false);
  const [createMode, setcreateMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const getEmployeeList = async () => {
    const resp = await getAllEmployee(__aT__);
    if (resp.data) {
      setEmployeeList(resp.data);
    }
  };

  const handleModal = (employee, e) => {
    setModal(!modal);
    if (employee !== null) {
      setSelectedEmployee(employee);
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

  const handleDelete = async (employee, e) => {
    const { id } = employee;

    const filtered = employeeList.filter((emp) => {
      emp.id = id;
    });
    setEmployeeList(filtered);
    try {
      setIsFetching(true);
      const resp = await deleteEmployee(id, __aT__);
      if (resp) {
        setIsFetching(false);
        setdeletemode(true);
      }
    } catch (error) {
      setIsFetching(false);
    }
  };

  const handleEdit = (employee, e) => {
    setUpdateMode(true);
    handleModal(employee, e);
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  useEffect(() => {
    getEmployeeList();
  }, [deletemode]);

  useEffect(() => {
    getEmployeeList();
  }, [updateMode]);

  useEffect(() => {
    getEmployeeList();
  }, [createMode === true && isFetching === false]);

  const employeeArr =
    employeeList &&
    employeeList.map((employee, idx) => {
      let name = `${employee.first_name} ${employee.last_name}`;
      let number = employee.mobile;
      let department = employee.department;
      return (
        <tr key={idx}>
          <td>{name}</td>
          <td>{number}</td>
          <td>{department}</td>
          <td>
            <span onClick={(e) => handleEdit(employee, e)}>
              <i className="fa fa-edit 2x " />
            </span>
            <span onClick={(e) => handleDelete(employee, e)} className="ml-2">
              <i className="fa fa-trash 2x " />
            </span>
          </td>
        </tr>
      );
    });

  function handleModalClose(resp) {
    setModal(false);
    setSelectedEmployee(null);
    if (resp === "updated") {
      setUpdateMode(true);
    }
    if (resp) {
      setIsFetching(false);
    }
  }
  const handleAdd = (e) => {
    setcreateMode(true);
    setIsFetching(true);
    handleModal(null, e);
  };

  return (
    <div>
      <h1>
        <span class="yellow">Employee List</span>
      </h1>
      <div>
        <span>
          <button
            disabled={!__aT__}
            onClick={(e) => handleAdd(e)}
            className="btn btn-outline-primary offset-5 border-radius-8"
          >
            ADD EMPLOYEE
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
              <h1>Contact</h1>
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
          {(__aT__ && employeeList.length > 0 && employeeArr) || (
            <h3 className="">
              "Sorry Please insert the Employee or Login to see employee details
              "
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
        <EmployeeAdd
          setUpdateMode={setUpdateMode}
          selectedEmployee={selectedEmployee}
          handleModal={handleModal}
          handleModalClose={handleModalClose}
        />
      </Modal>
    </div>
  );
}
