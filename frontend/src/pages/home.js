import React, { Component } from 'react';
import CreatePost from '../components/createPost';
import DisplayPosts from '../components/displayPosts'
import Header from '../components/header'

class HomePage extends Component {
    
    render(){
        return(
            <div>
            <Header/>
            <CreatePost/>
            <DisplayPosts/>
            </div>
        )
    }
}

export default HomePage