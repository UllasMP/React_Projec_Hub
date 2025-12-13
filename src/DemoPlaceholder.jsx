// src/DemoPlaceholder.jsx
import React from "react";
import { Link } from "react-router-dom";

function DemoPlaceholder({ title }) {
  return (
    <div className="demo-page">
      <div className="demo-card">
        <h1>{title}</h1>
        <p>You can attach the real project component to this route later.</p>
        <Link to="/" className="back-link">
          ← Back to React Projects
        </Link>
      </div>
    </div>
  );
}

export default DemoPlaceholder;
