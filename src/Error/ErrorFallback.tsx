import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorFallback() {
  const navigate = useNavigate();
  return (
    <div>
      <div>Opps Something went wrong!</div>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export default ErrorFallback;
