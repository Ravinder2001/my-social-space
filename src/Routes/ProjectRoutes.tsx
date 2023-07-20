import React from "react";

import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../Pages/Login/Login";
import { LocalStorageKey } from "../Utils/Constant";

function ProjectRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <button
              onClick={() => {
                localStorage.removeItem(LocalStorageKey);
                
              }}
            >
              Logout
            </button>
          </PrivateRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />
    </Routes>
  );
}

export default ProjectRoutes;
