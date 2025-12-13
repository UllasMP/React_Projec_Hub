import React, { useCallback } from "react";
import PatientCard from "./PatientCard";

const PatientTable = ({ patients, onEdit, onDeleteRequest }) => {
  const handleEdit = useCallback((p) => onEdit(p), [onEdit]);
  const handleDeleteRequest = useCallback((id) => onDeleteRequest(id), [onDeleteRequest]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Symptoms</th>
            <th>Appointment</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="6">No patients found.</td>
            </tr>
          ) : (
            patients.map((p) => (
              <PatientCard key={p.id} patient={p} onEdit={handleEdit} onDeleteRequest={handleDeleteRequest} />
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default PatientTable;
