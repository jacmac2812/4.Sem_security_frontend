import URL from "./settings";
import React, { useState, useEffect } from "react";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}
const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};
const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
};

const parseRole = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const setRole = (role) => {
  localStorage.setItem("role", role.roles);
};

const getRole = () => {
  return localStorage.getItem("role");
};

const setUser = (name) => {
  localStorage.setItem("name", name.username);
};

const getUser = () => {
  return localStorage.getItem("name");
};

const parseUser = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setRole(parseRole(res.token));
        setUser(parseUser(res.token));
      });
  };

  const fetchUserData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/" + getRole(), options).then(
      handleHttpErrors
    );
  };
//USER START
  const fetchAddUser = (user) => {
    const options = makeOptions("POST", true, user); //True add's the token
    return fetch(URL + "/api/users", options).then(handleHttpErrors);
  };
  const fetchEditUser = (user) => {
    const options = makeOptions("PUT", true, user); //True add's the token
    console.log(getUser())
    return fetch(URL + "/api/users/" +  getUser(), options).then(handleHttpErrors);
  };
  const fetchGetallUsers = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/users/all", options).then(handleHttpErrors);
  };
  const fetchDeleteUser = (user) => {
    const options = makeOptions("DELETE", true, user); //True add's the token
    return fetch(URL + "/api/users/" + user, options).then(handleHttpErrors);
  };
//USER END


// POST START
const fetchCreatePost = () => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(URL + "/api/users/all", options).then(handleHttpErrors);
};

const fetchDeletePost = () => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(URL + "/api/users/all", options).then(handleHttpErrors);
};

const fetchEditPost = () => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(URL + "/api/users/all", options).then(handleHttpErrors);
};

const fetchAllPosts = () => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(URL + "/api/users/all", options).then(handleHttpErrors);
};

const fetchAllUserPosts = () => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(URL + "/api/users/all", options).then(handleHttpErrors);
};
// POST END

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    getRole,
    getUser,
    loggedIn,
    login,
    logout,
    fetchUserData,
    fetchAddUser,
    fetchEditUser,
    fetchGetallUsers,
    fetchDeleteUser,
    fetchCreatePost,
    fetchDeletePost,
    fetchEditPost,
    fetchAllPosts,
    fetchAllUserPosts
  };
}
const facade = apiFacade();
export default facade;
