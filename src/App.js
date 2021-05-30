import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import AddUser from "./AddUser";
import Menu from "./Menu";
import { useHistory, } from "react-router-dom";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button className="button buttonIn" onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  return (
    <div>
      <Menu />
    </div>
  );
}

function App() {
  let hours = 1
  let saved = localStorage.getItem('saved')
  if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
    localStorage.clear()
  }
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    if (facade.getToken() === null) {
      setLoggedIn(false)
    }

  }, []);

  let history = useHistory();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    history.push("/");
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
    history.push("/user");
  };

  return (
    <div>
      {!loggedIn ? (
        <>
          <LogIn login={login} />
          <b />
          <h2>Or Create New User</h2>
          <AddUser />
        </>
      ) : (
          <div>
            <LoggedIn />
            <button className="button" onClick={logout}>Logout</button>
          </div>
        )}
    </div>
  );
}
export default App;
