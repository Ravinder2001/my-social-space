import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import { Add_Route, Discover_Route, Home_Route, Login_Route, Messages_Route, Profile_Route, Settings_Route } from "../Utils/Constant";
import Add from "../Pages/Add";
import ErrorFallback from "../Error/ErrorFallback";
import Home from "../Pages/Home";
import Message from "../Pages/Message";
import Settings from "../Pages/Settings";
import UserVerifed from "../Components/Organisms/UserVerified/UserVerifed";

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
            <Message />
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
        path={Settings_Route}
        element={
          <PrivateRoutes>
            <Settings />
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
      <Route path="/verify" element={<UserVerifed />} />
      <Route path="*" element={<ErrorFallback />} />
    </Routes>
  );
}

export default ProjectRoutes;
