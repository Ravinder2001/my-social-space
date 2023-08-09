import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import {
  Add_Route,
  Discover_Route,
  Home_Route,
  Login_Route,
  Messages_Route,
  Profile_Route,
} from "../Utils/Constant";
import Add from "../Pages/Add";

function ProjectRoutes() {
  return (
    <Routes>
      <Route
        path={Home_Route}
        element={
          <PrivateRoutes>
            <div>Hii</div>
          </PrivateRoutes>
        }
      />
      <Route
        path={Discover_Route}
        element={
          <PrivateRoutes>
            <div>discover</div>
          </PrivateRoutes>
        }
      />
      <Route
        path={Add_Route}
        element={
          <PrivateRoutes>
            <Add />
          </PrivateRoutes>
        }
      />
      <Route
        path={Messages_Route}
        element={
          <PrivateRoutes>
            <div>Messages</div>
          </PrivateRoutes>
        }
      />
      <Route
        path={Profile_Route}
        element={
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        }
      />
      <Route
        path={Login_Route}
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
