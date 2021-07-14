import React, { Component } from 'react';
import CreatePost from '../components/createPost';
import Post from '../components/post'

class HomePage extends Component {
    render(){
        return(
            <div>
            <CreatePost/>
            <Post/>
            </div>
        )
    }
}

export default HomePage