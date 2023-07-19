import React, { ReactNode } from "react";

type PublicRoutesType = {
  children: ReactNode;
};

function PublicRoutes({ children }: PublicRoutesType) {
  return <div>{children}</div>;
}

export default PublicRoutes;
