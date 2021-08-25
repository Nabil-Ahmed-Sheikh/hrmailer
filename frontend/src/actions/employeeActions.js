import axios from "axios";
import {
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_ADD_SINGLE_REQUEST,
  EMPLOYEE_ADD_SINGLE_SUCCESS,
  EMPLOYEE_ADD_SINGLE_FAIL,
  EMPLOYEE_ADD_MULTI_REQUEST,
  EMPLOYEE_ADD_MULTI_SUCCESS,
  EMPLOYEE_ADD_MULTI_FAIL,
} from "../constants/employeeConstants";

export const listEmployees =
  (page = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: EMPLOYEE_LIST_REQUEST });

      const { data } = await axios.get(`/api/users?page=${page}`);

      dispatch({
        type: EMPLOYEE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addSingleEmployee = (data) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_ADD_SINGLE_REQUEST });

    await axios.post(`/api/users`, data);

    dispatch({ type: EMPLOYEE_ADD_SINGLE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ADD_SINGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMultiEmployee = (file) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_ADD_MULTI_REQUEST });

    let formData = new FormData();
    formData.append("csv", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const data = await axios.post(`/api/users/multi`, formData, config);

    dispatch({ type: EMPLOYEE_ADD_MULTI_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ADD_MULTI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
