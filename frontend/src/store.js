import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { employeeListReducer } from "./reducers/employeeReducers";
import { emailSendReducer } from "./reducers/emailReducers";
const reducer = combineReducers({
  employeeList: employeeListReducer,
  emailSend: emailSendReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
