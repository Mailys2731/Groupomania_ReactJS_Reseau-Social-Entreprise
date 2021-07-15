import React, { Component } from 'react';
import CreatePost from '../components/createPost';
import Post from '../components/post'
import Header from '../components/header'

class HomePage extends Component {
    render(){
        return(
            <div>
            <Header/>
            <CreatePost/>
            <Post/>
            </div>
        )
    }
}

export default HomePage