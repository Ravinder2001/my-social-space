import React, { useEffect, useState } from "react";
import AddTemplate from "../Components/Templates/AddTemplate/AddTemplate";
import { useLocation } from "react-router-dom";
function Add() {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState<{ edit: boolean; post_id: string }>({
    edit: false,
    post_id: "",
  });

  useEffect(() => {
    if (location.search.includes("edit=true")) {
      const post_id = location.search.split("=");
      setIsEdit({ edit: true, post_id: post_id[2] });
    }
  }, []);

  return <AddTemplate isEdit={isEdit} />;
}

export default Add;
