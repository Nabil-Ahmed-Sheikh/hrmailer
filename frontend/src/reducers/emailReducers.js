import {
  EMAIL_SEND_REQUEST,
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAIL,
  EMAIL_SEND_RESET,
} from "../constants/emailConstants";

export const emailSendReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SEND_REQUEST:
      return { loading: true };
    case EMAIL_SEND_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EMAIL_SEND_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_SEND_RESET:
      return {};
    default:
      return state;
  }
};
