import facade from "./apiFacade";
import React, { useState, useEffect } from "react";

const User = () => {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchUserData().then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Welcome</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
};

export default User;
