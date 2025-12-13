// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ProjectsSection from "./components/ProjectsSection";
import DemoPlaceholder from "./DemoPlaceholder";
import Output from "./Projects/project1/Output";
import Out from "./Projects/Ecommerce/Out";




function App() {
  return (
    <>
    <Routes>
      {/* Main projects section */}
      <Route path="/" element={<ProjectsSection />} />

      {/* Demo routes (you can replace these with real components later) */}
      <Route
        path="/react-form-demo"
        element={<DemoPlaceholder title="React Form + Firebase Auth Demo" />}
      />
      <Route
        path="/hello/*"
        element={<Out/>}
      />
      <Route
        path="/weather-dashboard-demo"
        element={<DemoPlaceholder title="Weather Dashboard Demo" />}
      />
      <Route
        path="/hi"
        element={<Output/>}
      />

      
    </Routes>
    
    </>
  )
}

export default App;
