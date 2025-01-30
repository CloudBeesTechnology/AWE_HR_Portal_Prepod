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
      console.log(editedObj);
      if (!selectedRows.some((row) => row.id === editedObj.id)) {
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
