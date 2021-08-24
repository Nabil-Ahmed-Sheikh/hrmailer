import axios from "axios";
import {
  EMAIL_SEND_REQUEST,
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAIL,
} from "../constants/emailConstants";

export const sendEmail = (emailObject) => async (dispatch) => {
  try {
    dispatch({ type: EMAIL_SEND_REQUEST });

    await axios.post(`/api/email`, emailObject);

    dispatch({ type: EMAIL_SEND_SUCCESS });
  } catch (error) {
    dispatch({
      type: EMAIL_SEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
