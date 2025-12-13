import React from "react";

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 className="modal-title">{project.title}</h2>

        <p className="modal-description">{project.description}</p>

        <p className="modal-tech">
          <span className="modal-tech-label">Tech Stack: </span>
          {project.techStack}
        </p>
      </div>
    </div>
  );
}

export default ProjectModal;
