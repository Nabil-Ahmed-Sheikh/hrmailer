import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  employeeListReducer,
  addSingleEmployeeReducer,
  addMultiEmployeeReducer,
} from "./reducers/employeeReducers";
import { emailSendReducer } from "./reducers/emailReducers";

const reducer = combineReducers({
  employeeList: employeeListReducer,
  emailSend: emailSendReducer,
  addSingleEmployee: addSingleEmployeeReducer,
  addMultiEmployee: addMultiEmployeeReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
