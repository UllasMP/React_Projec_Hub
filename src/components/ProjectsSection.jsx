import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectModal from "./ProjectModel";

const projects = [
  {
    id: "react-form",
    title: "React Form + Firebase Auth",
    subtitle: "User registration & login with form validation.",
    techStack: "React, Forms, State",
    description:
      "This app demonstrates controlled components, form validation, and basic state management. In your real version, you can integrate Firebase Authentication.",
    demoRoute: "/react-form-demo",
  },
  {
    id: "react-ecommerce",
    title: "React Ecommerce UI",
    subtitle: "Simple ecommerce layout with cart.",
    techStack: "React, Routing, State",
    description:
      "A clean ecommerce user interface with product cards, cart management, and basic routing. Perfect base for a full MERN ecommerce app.",
    demoRoute: "/hello",
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    subtitle: "Weather app demo with search.",
    techStack: "React, API Calls, State",
    description:
      "A weather dashboard showing current conditions for a searched city. Demonstrates API integration and dynamic UI updates.",
    demoRoute: "/hi",
  },
 
];

function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = (project) => {
    setActiveProject(project);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
  };

  const handleLiveDemo = (project) => {
    navigate(project.demoRoute);
  };

  return (
    <div className="page-bg">
      <div className="projects-wrapper">
        <header className="projects-header">
          <h1 className="projects-title">My React Projects</h1>
          <p className="projects-subtitle">
            Click <span className="highlight">View Details</span> to know more
            or <span className="highlight">Live Demo</span> to run the project
            in this page with its own route.
          </p>
        </header>

        <div className="cards-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <h2 className="project-title">{project.title}</h2>
              <p className="project-subtitle">{project.subtitle}</p>

              <div className="card-buttons">
                <button
                  className="btn-outline"
                  onClick={() => handleViewDetails(project)}
                >
                  View Details
                </button>
                <button
                  className="btn-gradient"
                  onClick={() => handleLiveDemo(project)}
                >
                  Live Demo
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Popup modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ProjectsSection;
