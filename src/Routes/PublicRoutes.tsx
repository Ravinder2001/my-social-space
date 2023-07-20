import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

type PublicRoutesType = {
  children: ReactNode;
};

function PublicRoutes({ children }: PublicRoutesType) {
  const User = useSelector((state: RootState) => state.user.user);
  return !User ? <div>{children}</div> : <Navigate to="/" />;
}

export default PublicRoutes;
