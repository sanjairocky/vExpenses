import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./Routes";
import { AppProvider } from "./context/app";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider
      value={{
        users: [
          { id: "U1", name: "Sanjai" },
          { id: "U2", name: "Rocky" },
        ],
        trips: [
          {
            id: "T0",
            name: "dummy trip",
            tripOn: new Date(),
            expenses: [
              {
                id: "E0",
                name: "tea shop",
                spentOn: new Date(),
                users: ["U1", "U2"],
              },
              {
                id: "E1",
                name: "Dress shop",
                spentOn: new Date(),
                users: ["U2"],
              },
            ],
          },
        ],
      }}
    >
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
