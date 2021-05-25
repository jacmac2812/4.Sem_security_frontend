import facade from "./apiFacade";
import React, { useState } from "react";
import "./style.css";
import "bootstrap"

const CreatePost = () => {

  const initialValue = {
    content: ""
  };

  const [newPost, setNewPost] = useState(initialValue);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    facade.fetchCreatePost(newPost);
    setNewPost(initialValue);
  };


  return (
    <form onSubmit={handleSubmit}>

      <input
        name="content"
        value={newPost.content}
        onChange={handleChange}
        placeholder="Write Post Watch your mind bitch"
      />
      <br />

      <button className="button buttonCategory buttonSort" type="submit" value="Submit">Post</button>

    </form>

  );
};

export default CreatePost;



