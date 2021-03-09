import facade from "./apiFacade";
import React, { useState } from "react";
import "./style.css";
import "bootstrap"

const CreateUser = () => {

  const initialValue = {
    name: "",
    password: "",
    email: "",
    phoneNumber: ""
  };

  const [newUser, setNewUser] = useState(initialValue);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    facade.fetchAddUser(newUser);
    setNewUser(initialValue);
  };


  return (
    <form onSubmit={handleSubmit}>

      <input
        name="name"
        value={newUser.name}
        onChange={handleChange}
        placeholder="Add name"
      />
      <br />
      <input
        name="password"
        value={newUser.password}
        onChange={handleChange}
        placeholder="Add password"
      />
      <br />
      <input
        name="email"
        value={newUser.email}
        onChange={handleChange}
        placeholder="Add email"
      />
      <br />
      <input
        name="phoneNumber"
        value={newUser.phoneNumber}
        onChange={handleChange}
        placeholder="Add phonenumber"
      />
      <br />

      <button className="button buttonCategory buttonSort" type="submit" value="Submit">Add</button>

    </form>

  );
};

export default CreateUser;



