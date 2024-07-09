import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import PostContainer from "../../components/PostContainer/PostContainer";
import PostUpload from "../../components/PostUpload/PostUpload";

function Home() {
  return (
    <div style={{ display: "flex", width: "100%", margin: "auto", justifyContent: "space-between" }}>
      <PostContainer />
      <PostUpload />
    </div>
  );
}

export default Home;
