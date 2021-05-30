import ProductSearch from "./ProductSearch";
import User from "./user";
import Home from "./home";
import AddUser from "./AddUser";
import EditUser from "./editUser";
import Users from "./Users";
import Posts from "./posts";
import facade from "./apiFacade";
import React, { useState, useEffect } from "react";
import { NavLink, Route, Switch } from "react-router-dom";


export default function Menu() {
  const role = facade.getRole();
  const [isAdmin, setIsAdmin] = useState(role ? false : true);

  const checkRole = (role) => {
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  useEffect(() => {
    checkRole(role);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="header">
          <li>
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/user">Welcome</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/edituser">Edit User</NavLink>
          </li>
          {
            isAdmin && (
              <>
                <li>
                  <NavLink activeClassName="active" to="/users">See all users</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/adduser">Add user</NavLink>
                </li>
              </>
            )}
          <li>
            <NavLink activeClassName="active" to="/posts">Chat</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/adduser">
          <AddUser />
        </Route>
        <Route path="/edituser">
          <EditUser />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
      </Switch>
    </div>
  );
}
