import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap";
import validator from "validator";
import Loader from "./Loader";
import Message from "./Message";
import { addSingleEmployee } from "../actions/employeeActions";

const AddForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const singleEmployee = useSelector((state) => state.addSingleEmployee);
  const { loading, success, error } = singleEmployee;

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    dispatch(addSingleEmployee({ firstName, lastName, email }));
  };

  return (
    <>
      <Card className="text-center" style={{ width: "60%", margin: "auto" }}>
        <Container style={{ width: "80%", marginBottom: "30px" }}>
          <h4 style={{ marginTop: "10px" }}>Single Employee</h4>
          {loading ? (
            <Loader />
          ) : (
            <Form>
              <Form.Group className="mb-3" controlId="singleForm">
                <Row>
                  <Col style={{ padding: "10px 5px 0px 5px" }} md={6}>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                    {firstName.length > 0 && !validator.isAlpha(firstName) && (
                      <Form.Text className="text-muted">
                        **Invalid Last Name
                      </Form.Text>
                    )}
                  </Col>
                  <Col style={{ padding: "10px 5px 0px 5px" }} md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                    {lastName.length > 0 && !validator.isAlpha(lastName) && (
                      <Form.Text className="text-muted">
                        **Invalid Last Name
                      </Form.Text>
                    )}
                  </Col>
                </Row>
                <Row style={{ padding: "10px 5px" }}>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </Row>
                {email.length > 0 && !validator.isEmail(email) && (
                  <Form.Text className="text-muted">**Invalid Email</Form.Text>
                )}
              </Form.Group>
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">{"Done!"}</Message>}
              <Button
                variant="primary"
                type="button"
                disabled={
                  !validator.isEmail(email) ||
                  !validator.isAlpha(firstName) ||
                  !validator.isAlpha(lastName)
                }
                onClick={handleSubmit}
              >
                ADD EMPLOYEE
              </Button>
            </Form>
          )}
        </Container>
      </Card>
    </>
  );
};

export default AddForm;
