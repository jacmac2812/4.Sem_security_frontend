import facade from "./apiFacade";
import CreatePost from "./createPost";
import React, { useState, useEffect } from "react";
import "./style.css";

const Posts = () => {
    const [PostsData, setPostsData] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            facade.fetchAllPosts().then((data) => setPostsData(data.all));
        }, 10);
        return () => clearInterval(interval);


    }, []);

    const handleDeletePost = (name, id) => {
        facade.fetchDeletePost(name, id).then(facade.fetchAllPosts().then((data) => setPostsData(data.all)));
    }


    return (
        <div>
            <table className="table-Post">

                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Content</th>
                    <th>Delete Post</th>
                </tr>
            </table>
            {

                PostsData && PostsData.map((Post, i) => {
                    return (
                        <div key={i}>
                            <table className="table-Post">
                                <tr>
                                    <td>{Post.userName}</td>
                                    <td>{Post.date}</td>
                                    <td>{Post.content}</td>
                                    <td>{PostsData && <button className="button buttonCategory buttonSort" onClick={() => handleDeletePost(Post.userName, Post.id)}>DELETE</button>}</td>
                                </tr>
                            </table>
                        </div>
                    );
                })
            }
            <CreatePost />
        </div>
    );
};

export default Posts;