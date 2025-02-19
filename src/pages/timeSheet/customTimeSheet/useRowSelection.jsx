import { useState } from "react";

export const useRowSelection = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (row) => {
    if (selectedRows.some((r) => r.id === row.id)) {
      setSelectedRows(selectedRows.filter((r) => r.id !== row.id));
    } else {
      setSelectedRows([...selectedRows, row]);
     
    }
  };

  const handleSubmit = (editedObj) => {
    if (editedObj) {
     
      const exists = selectedRows.some((row) => row.id === editedObj.id);

      if (exists) {
        const updatedRows = selectedRows.map((row) =>
          row.id === editedObj.id ? editedObj : row
        );
        setSelectedRows(updatedRows);
      } else {
        setSelectedRows([...selectedRows, editedObj]);
      }
    }
  };

  return {
    selectedRows,
    setSelectedRows,
    handleCheckboxChange,
    handleSubmit,
  };
};
