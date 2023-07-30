import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { Home_Route } from "../Utils/Constant";

type PublicRoutesType = {
  children: ReactNode;
};

function PublicRoutes({ children }: PublicRoutesType) {
  const User = useSelector((state: RootState) => state.UserReducer.user);
  return !User ? <div>{children}</div> : <Navigate to={Home_Route} />;
}

export default PublicRoutes;
