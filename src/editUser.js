import facade from "./apiFacade";
import ProfilePicPath from "./uploadPic";
import React, { useState } from "react";
import "./style.css";
import "bootstrap"

const EditUser = () => {
  const initialValue = {
    password: "",
    email: "",
    age: "",
    profilePicPath: ""
  };

  const [editUser, setEditUser] = useState(initialValue);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSubmit = event => {
    if(editUser.age === ""){
      editUser.age = "0";
    }
    event.preventDefault();
    facade.fetchEditUser(editUser);
    setEditUser(initialValue);
  };


  return (
    <>
    <h3>You are editing: {facade.getUser()}</h3>
    <form onSubmit={handleSubmit}>

      <input
        name="password"
        value={editUser.password}
        onChange={handleChange}
        placeholder="Edit password"
      />
      <br />
      <input
        type="email"
        name="email"
        value={editUser.email}
        onChange={handleChange}
        placeholder="Edit email"
      />
      <br />
      <input
        name="age"
        value={editUser.age}
        onChange={handleChange}
        placeholder="Edit age"
      />
      <br />

      <button className="button buttonCategory buttonSort" type="submit" value="Submit">Edit</button>

    </form>
    <h3>Change profile picture</h3>
    <ProfilePicPath />
    <br />
    </>

  );
};

export default EditUser;