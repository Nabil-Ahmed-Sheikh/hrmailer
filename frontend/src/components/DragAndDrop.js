import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDrop = ({ selectFile, selectedFile }) => {
  const [error, setError] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Accepted File types
      const acceptedTypes = [
        ".csv",
        "text/csv",
        "application/vnd.ms-excel",
        "application/csv",
        "text/x-csv",
        "application/x-csv",
        "text/comma-separated-values",
        "text/x-comma-separated-values",
      ];
      // Validation
      const fileExtension = acceptedFiles[0].name.split(".")[1];
      if (
        acceptedTypes.includes(acceptedFiles[0].type) &&
        fileExtension === "csv"
      ) {
        selectFile(acceptedFiles[0]);
      } else {
        selectFile(null);
        setError(true);
      }
    },
    [selectFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedFile ? (
        <p>{selectedFile.name}</p>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop csv file, or click to select file</p>
      )}
      {error && <p>Only CSV file</p>}
    </div>
  );
};

export default DragAndDrop;
