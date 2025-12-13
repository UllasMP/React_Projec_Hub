import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function Output(){
  return(
    <>
  
    <ThemeProvider>
      <App />
    </ThemeProvider>
 
    </>
  )
  
}

export default Output;

