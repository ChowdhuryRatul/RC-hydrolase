import React from "react";
import ReactDOM from "react-dom/client";

// import main App jsx
import App from "./app/App";

// Set up Routing for React SPA Application
import { BrowserRouter } from "react-router-dom";

// we always do npm install --save normalize.css
// this is to reset the CSS, 
// we need this because all browser have different default css.
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
