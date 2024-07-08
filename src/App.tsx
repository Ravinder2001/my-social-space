import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import PostUpload from "./components/PostUpload/PostUpload";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", width: "92%",margin:"auto" }}>
        <Sidebar />
        <PostUpload />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
