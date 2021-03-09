import facade from "./apiFacade";
import React, { useState } from "react";
import "./style.css";
import "bootstrap"

const EditUser = () => {
  const initialValue = {
    password: "",
    email: "",
    phoneNumber: ""
  };

  const [editUser, setEditUser] = useState(initialValue);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSubmit = event => {
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
        name="email"
        value={editUser.email}
        onChange={handleChange}
        placeholder="Edit email"
      />
      <br />
      <input
        name="phoneNumber"
        value={editUser.phoneNumber}
        onChange={handleChange}
        placeholder="Edit phonenumber"
      />
      <br />

      <button className="button buttonCategory buttonSort" type="submit" value="Submit">Edit</button>

    </form>
    </>

  );
};

export default EditUser;