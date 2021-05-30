import facade from "./apiFacade";
import URL from "./settings";
import React, { Component, useState } from "react";
import "./style.css";
import "bootstrap"
import axios from "axios";

class uploadPic extends Component {
    state = {
        selectedFile: null
    }
    filSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    uploadHandler = () => {
        let user = {
            password: "",
            email: "",
            age: "0",
            profilePicPath: ""
        };
        const formData = new FormData()
        formData.append(
            'file',
            this.state.selectedFile,
            this.state.selectedFile.name,
        )
        console.log(formData)
        axios.post(URL + "/api/users/uploadpicture", formData).then(res => {
            console.log(res)
            user.profilePicPath = res.data
            facade.fetchEditUser(user)
        });
    }

    render() {
        return (
            <div className="uploadPic">
                <input type="file" onChange={this.filSelectedHandler} />
                <button onClick={this.uploadHandler}>Upload</button>
            </div>
        )
    }
}



export default uploadPic;