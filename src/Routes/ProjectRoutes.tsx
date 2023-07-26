import React from "react";

import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../Pages/Login/Login";
import { LocalStorageKey } from "../Utils/Constant";
import ProfileTemplate from "../Components/Templates/ProfileTemplate/ProfileTemplate";

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
        path="/discover"
        element={
          <PrivateRoutes>
            <div>discover</div>
          </PrivateRoutes>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoutes>
            <div>Add</div>
          </PrivateRoutes>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoutes>
            <div>Messages</div>
          </PrivateRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoutes>
            <ProfileTemplate />
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
