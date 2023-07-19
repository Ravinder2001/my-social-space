import React, { ReactNode } from "react";

type PrivateRoutesType = { children: ReactNode };

function PrivateRoutes({ children }: PrivateRoutesType) {
  return <div>{children}</div>;
}

export default PrivateRoutes;
