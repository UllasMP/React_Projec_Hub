import React from "react";

const PatientForm = ({ form, setForm, handleSubmit }) => {
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input className="input-field" name="name" placeholder="Name" value={form.name} onChange={onChange} />
          <input className="input-field" name="age" placeholder="Age" value={form.age} onChange={onChange} style={{ marginLeft: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input className="input-field" name="appointment" placeholder="Appointment" value={form.appointment} onChange={onChange} />
          <select className="input-field" name="priority" value={form.priority} onChange={onChange} style={{ marginLeft: 8 }}>
            <option>Normal</option>
            <option>High</option>
          </select>
        </div>
        <div style={{ marginBottom: 8 }}>
          <input className="input-field" name="symptoms" placeholder="Symptoms" value={form.symptoms} onChange={onChange} style={{ width: "60%" }} />
        </div>
        <div>
          <button className="btn" type="submit">{form.id ? "Update Patient" : "Add Patient"}</button>
        </div>
      </form>
    </>
  );
};

export default PatientForm;
