// src/projectsConfig.js
import FormApp from "./projects/FormApp/FormApp";
import EcommerceApp from "./projects/EcommerceApp/EcommerceApp";
import WeatherApp from "./projects/WeatherApp/WeatherApp";

export const projects = [
  {
    id: "form-app",
    title: "React Form + Firebase Auth",
    shortDesc: "User registration & login with form validation.",
    longDesc:
      "This app demonstrates controlled components, form validation, and basic state management. In your real version, you can integrate Firebase Authentication.",
    techStack: ["React", "Forms", "State"],
    component: FormApp,
  },
  {
    id: "ecom-app",
    title: "React Ecommerce UI",
    shortDesc: "Simple ecommerce layout with cart.",
    longDesc:
      "Showcases product listing, cart functionality, and derived state (total price). In your actual project, you can connect APIs or use context.",
    techStack: ["React", "State", "Array methods"],
    component: EcommerceApp,
  },
  {
    id: "weather-app",
    title: "Weather Dashboard",
    shortDesc: "Weather app demo with search.",
    longDesc:
      "Demonstrates search input, conditional rendering, and API pattern. You can plug in a real weather API in your final version.",
    techStack: ["React", "Forms", "API pattern"],
    component: WeatherApp,
  },
];
