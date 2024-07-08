import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import PostUpload from "./components/PostUpload/PostUpload";
import { Toaster } from "react-hot-toast";
import PostContainer from "./components/PostContainer/PostContainer";
function App() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", width: "92%",margin:"auto",justifyContent:"space-between" }}>
        <Sidebar />
        <PostContainer/>
        <PostUpload />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
