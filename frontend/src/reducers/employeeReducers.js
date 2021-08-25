import {
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LIST_RESET,
  EMPLOYEE_ADD_SINGLE_REQUEST,
  EMPLOYEE_ADD_SINGLE_SUCCESS,
  EMPLOYEE_ADD_SINGLE_FAIL,
  EMPLOYEE_ADD_SINGLE_RESET,
  EMPLOYEE_ADD_MULTI_REQUEST,
  EMPLOYEE_ADD_MULTI_SUCCESS,
  EMPLOYEE_ADD_MULTI_FAIL,
  EMPLOYEE_ADD_MULTI_RESET,
} from "../constants/employeeConstants";

export const employeeListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true };
    case EMPLOYEE_LIST_SUCCESS:
      return {
        loading: false,
        employees: action.payload.users,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case EMPLOYEE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_LIST_RESET:
      return { employees: [] };
    default:
      return state;
  }
};

export const addSingleEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_ADD_SINGLE_REQUEST:
      return { loading: true };
    case EMPLOYEE_ADD_SINGLE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EMPLOYEE_ADD_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_ADD_SINGLE_RESET:
      return {};
    default:
      return state;
  }
};

export const addMultiEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_ADD_MULTI_REQUEST:
      return { loading: true };
    case EMPLOYEE_ADD_MULTI_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case EMPLOYEE_ADD_MULTI_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_ADD_MULTI_RESET:
      return {};
    default:
      return state;
  }
};
