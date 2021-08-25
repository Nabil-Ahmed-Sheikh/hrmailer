import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Card } from "react-bootstrap";
import DragAndDrop from "./DragAndDrop";
import { addMultiEmployee } from "../actions/employeeActions";
import Loader from "./Loader";
import Message from "./Message";

const AddMultiForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const multiEmployee = useSelector((state) => state.addMultiEmployee);
  const { loading, data, error } = multiEmployee;

  const selectFile = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    dispatch(addMultiEmployee(selectedFile));
  };

  return (
    <>
      <Card className="text-center" style={{ width: "60%", margin: "auto" }}>
        {loading ? (
          <Loader />
        ) : (
          <Container style={{ width: "80%", marginBottom: "30px" }}>
            <h4 style={{ marginTop: "10px" }}>Upload CSV</h4>
            <DragAndDrop selectFile={selectFile} selectedFile={selectedFile} />
          </Container>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {data && <Message variant="success">{data.data.message}</Message>}
        {selectedFile && (
          <Button variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        )}
      </Card>
    </>
  );
};

export default AddMultiForm;
