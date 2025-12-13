import React from "react";

const PatientCard = ({ patient, onEdit, onDeleteRequest }) => {
  const { name, age, symptoms, appointment, priority } = patient;
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{age}</td>
        <td>{symptoms}</td>
        <td>{appointment}</td>
        <td>{priority}</td>
        <td>
          <button className="btn" onClick={() => onEdit(patient)} style={{ marginRight: 8 }}>
            Edit
          </button>
          <button className="btn delete" onClick={() => onDeleteRequest(patient.id)}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

// shallow props compare (fine if patient objects are replaced immutably when changed)
export default React.memo(PatientCard);
