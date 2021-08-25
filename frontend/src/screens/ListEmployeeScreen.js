import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listEmployees } from "../actions/employeeActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button, Row, Col, InputGroup } from "react-bootstrap";
import Paginate from "../components/Paginate";
import EmailModal from "../components/EmailModal";

const ListEmployeeScreen = ({ match }) => {
  const pageNumber = match.params.page || 1;

  const [checkedEmailList, setCheckedEmailList] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const employeeList = useSelector((state) => state.employeeList);
  const { loading, error, employees, pages, page } = employeeList;

  const addEmployeeToList = (email) => {
    if (checkedEmailList.includes(email)) {
      const newList = checkedEmailList.filter(
        (employeeEmail) => employeeEmail !== email
      );
      setCheckedEmailList(newList);
    } else {
      setCheckedEmailList([...checkedEmailList, email]);
    }
  };

  useEffect(() => {
    dispatch(listEmployees(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <div>
      <h1>Employees</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col lg={10} md={9}>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>EMAIL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.email}>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.email}</td>
                      <td>
                        <InputGroup>
                          <InputGroup.Checkbox
                            aria-label="Checkbox for emailing"
                            onChange={() => addEmployeeToList(employee.email)}
                          />
                        </InputGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col lg={2} md={3} className="text-center">
              {checkedEmailList.length > 0 && (
                <Button style={{ margin: "25% 0 10% 0" }} onClick={handleShow}>
                  <i class="fas fa-paper-plane"></i> Send Email
                </Button>
              )}
            </Col>
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
      <EmailModal
        show={show}
        handleClose={handleClose}
        backdrop="static"
        keyboard={false}
        emailList={checkedEmailList}
      />
    </div>
  );
};

export default ListEmployeeScreen;
