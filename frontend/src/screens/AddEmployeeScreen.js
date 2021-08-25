import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddForm from "../components/AddForm";
import AddMultiForm from "../components/AddMultiForm";
import ColoredLine from "../components/ColoredLine";
import {
  EMPLOYEE_ADD_MULTI_RESET,
  EMPLOYEE_ADD_SINGLE_RESET,
} from "../constants/employeeConstants";

const AddEmployeeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: EMPLOYEE_ADD_MULTI_RESET });
    dispatch({ type: EMPLOYEE_ADD_SINGLE_RESET });
  });

  return (
    <>
      <h1 style={{ textAlign: "center", padding: "3% 0 3% 0" }}>
        Add Employee
      </h1>
      <AddForm />
      <ColoredLine color={"#56cc9d"} />
      <AddMultiForm />
    </>
  );
};

export default AddEmployeeScreen;
