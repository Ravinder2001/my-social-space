import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import ErrorFallback from "../error/ErrorFallback";
import { Friends_Route, Home_Route, Login_Route,Messages_Route } from "../utils/constant";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Friends from "../pages/Friends/Friends";
import Messages from "../pages/Messages/Messages";

function ProjectRoutes() {
  return (
    <Routes>
      <Route
        path={Home_Route}
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route
        path={Friends_Route}
        element={
          <PrivateRoutes>
            <Friends />
          </PrivateRoutes>
        }
      />
      <Route
        path={Messages_Route}
        element={
          <PrivateRoutes>
            <Messages />
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
      <Route path="*" element={<ErrorFallback />} />
    </Routes>
  );
}

export default ProjectRoutes;
