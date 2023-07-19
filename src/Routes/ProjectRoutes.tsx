import React from "react";

import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../Pages/Login/Login";

function ProjectRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <div>Hii</div>
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
