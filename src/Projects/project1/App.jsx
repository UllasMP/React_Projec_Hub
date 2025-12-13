import React, { useReducer, useMemo, useCallback, useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { patientReducer, ACTIONS } from "./reducer/patientReducer";
import PatientForm from "./components/PatientForm";
import PatientTable from "./components/PatientTable";
import Statistics from "./components/Statistics";
import Modal from "./components/Modal";
import ErrorBoundary from "./components/ErrorBoundary";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="app-header"
      style={{
        backgroundColor: theme === "dark" ? "var(--header-bg-dark)" : "var(--header-bg)",
        color: "white",
        transition: "all 0.3s ease",
        padding: "20px 0",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <h1 style={{ margin: 0, fontSize: 26 }}>Healthcare Management Dashboard</h1>
      <div style={{ marginTop: 8 }}>
        <button
          className="btn"
          onClick={toggleTheme}
          style={{
            background: theme === "dark" ? "var(--btn-alt)" : "white",
            color: theme === "dark" ? "white" : "#333",
          }}
        >
          {theme === "light" ? "Dark Mode" : " Light Mode"}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer" style={{ marginTop: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
      <p>© {year} Healthcare Management System — All Rights Reserved.</p>
      <p style={{ fontSize: 14, color: "#dfefff" }}>Ullas MP</p>
    </footer>
  );
}

function App() {
  const [storedPatients, setStoredPatients] = useLocalStorage("patients", []);
  const [patients, dispatch] = useReducer(patientReducer, storedPatients || []);
  const [form, setForm] = useState({ id: null, name: "", age: "", symptoms: "", appointment: "", priority: "Normal" });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("appointment");

  // modal delete
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!form.name || !form.age || !form.appointment) return;
      if (form.id) dispatch({ type: ACTIONS.UPDATE, payload: form });
      else dispatch({ type: ACTIONS.ADD, payload: { ...form, id: Date.now() } });

      setForm({ id: null, name: "", age: "", symptoms: "", appointment: "", priority: "Normal" });
    },
    [form]
  );

  const handleEdit = useCallback((p) => setForm(p), []);
  const handleDelete = useCallback((id) => dispatch({ type: ACTIONS.DELETE, payload: id }), []);

  const handleRequestDelete = useCallback((id) => {
    setPendingDeleteId(id);
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (pendingDeleteId != null) {
      dispatch({ type: ACTIONS.DELETE, payload: pendingDeleteId });
    }
    setIsModalOpen(false);
    setPendingDeleteId(null);
  }, [pendingDeleteId]);

  const cancelDelete = useCallback(() => {
    setIsModalOpen(false);
    setPendingDeleteId(null);
  }, []);

  const handleFilter = useCallback((level) => {
    if (level === "All") dispatch({ type: ACTIONS.RESET_FILTER, payload: storedPatients });
    else dispatch({ type: ACTIONS.FILTER, payload: level });
  }, [storedPatients]);

  const filteredPatients = useMemo(() => {
    let list = [...patients];
    if (search) {
      const s = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.appointment.includes(search));
    }
    if (sortBy === "appointment") list.sort((a, b) => a.appointment.localeCompare(b.appointment));
    else list.sort((a, b) => b.priority.localeCompare(a.priority));
    return list;
  }, [patients, search, sortBy]);

  const stats = useMemo(() => {
    const total = patients.length;
    const highPriority = patients.filter((p) => p.priority === "High").length;
    return { total, highPriority };
  }, [patients]);

  useEffect(() => {
    setStoredPatients(patients);
  }, [patients, setStoredPatients]);

  return (
    <div className="app-container">
      <Header />

      <ErrorBoundary>
        <div className="main-content">
          <PatientForm form={form} setForm={setForm} handleSubmit={handleSubmit} />

          <div className="filter-section" style={{ marginTop: 12 }}>
            <button className="btn" onClick={() => handleFilter("All")}>All</button>
            <button className="btn" onClick={() => handleFilter("High")}>High Priority</button>
            <input className="input-field" placeholder="Search by name/date" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="input-field" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="appointment">Sort by Appointment</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          <PatientTable patients={filteredPatients} onEdit={handleEdit} onDeleteRequest={handleRequestDelete} />
          <Statistics stats={stats} />
        </div>
      </ErrorBoundary>

      <Footer />

      {isModalOpen && (
        <Modal title="Confirm delete" onClose={cancelDelete}>
          <p>Are you sure you want to delete this patient record?</p>
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <button className="btn" onClick={cancelDelete} style={{ marginRight: 8 }}>Cancel</button>
            <button className="btn delete" onClick={confirmDelete}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
