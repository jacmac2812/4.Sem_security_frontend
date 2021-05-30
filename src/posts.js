import facade from "./apiFacade";
import CreatePost from "./createPost";
import React, { Image, base64icon, useState, useEffect, useRef } from "react";
import "./style.css";
import axios from "axios";
import { data } from "jquery";

const Posts = () => {
    const [PostsData, setPostsData] = useState("");
    
    let count = -1;
    const PictureData = useRef([])

    // useEffect(() => {

    //         facade.fetchAllPosts().then((data) => setPostsData(data.all));
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // count = -1;
            // PictureData.current = [];
            facade.fetchAllPosts().then((data) => setPostsData(data.all))
            
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleDeletePost = (name, id) => {
        facade.fetchDeletePost(name, id).then(facade.fetchAllPosts().then((data) => setPostsData(data.all)));
    }

     const handleGetPicture = async (name) => {
        const boo = URL + "/api/users/getpicture/" + name
        console.log(boo)
        axios.get(boo, {
            responseType: 'arraybuffer'
        }).then(res => {
            const foo = 'data:image/jpeg;base64, ' + Buffer.from(res.data, 'binary').toString('base64')
            console.log(res.data)
            return foo
        }).then(data => {
            // console.log(data)
            PictureData.current.push(data);
            // console.log(PictureData.current)

        })
    }
    



    return (
        <div>
            <table className="table-Post">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Picture</th>
                        <th>Date</th>
                        <th>Content</th>
                        <th>Delete Post</th>
                    </tr>
                </thead>
            </table>
            {

                PostsData && PostsData.map((Post, i) => {
                    if(PostsData.length !== PictureData.current.length){
                        count = -1;
                        PictureData.current = [];
                    
                    handleGetPicture(Post.userName)
                    
                    }
                    count++;
                    return (
                        <div key={i}>
                            <table className="table-Post">
                                <tbody>
                                    <tr>
                                        <td>{Post.userName}</td>
                                        <td>{PostsData && <img src={PictureData.current[count]} />} </td>
                                        <td>{Post.date}</td>
                                        <td>{Post.content}</td>
                                        <td>{PostsData && <button className="button buttonCategory buttonSort" onClick={() => handleDeletePost(Post.userName, Post.id)}>DELETE</button>}</td>
                                    </tr>
                                </tbody>
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