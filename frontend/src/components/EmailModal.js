import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import validator from "validator";
import { sendEmail } from "../actions/emailActions";
import Loader from "./Loader";
import Message from "./Message";
import { EMAIL_SEND_RESET } from "../constants/emailConstants";

const EmailModal = ({ show, handleClose, emailList }) => {
  const emailSend = useSelector((state) => state.emailSend);
  const { loading, success, error } = emailSend;

  const dispatch = useDispatch();

  const sender = "hr@hrmailer.com";
  const [invalidEmail, setInvalidEmail] = useState(false);

  // Formatting emails to string
  let emailListString = "";
  emailList.forEach((email) => {
    if (!validator.isEmail(email)) {
      setInvalidEmail(true);
    }
    emailListString = emailListString + email + ",";
  });
  emailListString = emailListString.slice(0, -1);

  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleTextChange = (e) => setText(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);

  const handleSubmit = () => {
    const emailObject = {
      to: emailListString,
      from: sender,
      subject,
      text,
    };
    dispatch(sendEmail(emailObject));
    if (success) {
      dispatch({ type: EMAIL_SEND_RESET });
      setSubject("");
      setText("");
      handleClose();
    }
  };

  const closeAndReset = () => {
    dispatch({ type: EMAIL_SEND_RESET });
    setSubject("");
    setText("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={closeAndReset}>
      {success ? (
        <Message variant="success">{"Sent!"}</Message>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Compose</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="to">
                <Form.Label>Email addresses</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={emailListString}
                  readOnly
                />
                {emailListString.length < 1 && (
                  <Form.Text className="text-muted">
                    **No recipient selected
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="subject">
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={handleSubjectChange}
                />
                {subject.length < 1 && (
                  <Form.Text className="text-muted">
                    **Subject is blank
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="text">
                <Form.Control
                  as="textarea"
                  placeholder="Text"
                  rows={3}
                  value={text}
                  onChange={handleTextChange}
                />
                {text.length < 1 && (
                  <Form.Text className="text-muted">**Text is blank</Form.Text>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={
                  !(
                    !invalidEmail &&
                    text.length >= 1 &&
                    subject.length >= 1 &&
                    emailListString.length >= 1
                  )
                }
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={closeAndReset}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
