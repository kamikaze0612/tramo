import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { CitiesContextProvider } from "./contexts/CitiesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CitiesContextProvider>
      <App />
    </CitiesContextProvider>
  </React.StrictMode>
);
