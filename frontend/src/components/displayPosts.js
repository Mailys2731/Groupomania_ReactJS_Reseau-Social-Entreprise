import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Post from '../components/post'





class DisplayPosts extends Component {

    state = {
        posts: [],
       
    }
    

    componentDidMount() {
     
        // GET request using axios with error handling
        axios.get('http://localhost:3000/api/posts', { headers: { Authorization: `Bearer ${JSON.parse(localStorage.token)}` } })

            .then(res => {
                const posts = res.data.data.map(post => ({ description: post.description, imageUrl: post.imageUrl, id: post.id, userId: post.UserId, userName: post.userName }));
                this.setState({ posts })
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
           
    }

   
    render() {
        return (
            <div>
                {this.state.posts.map((post) =>

                    <Post post = {post} posts = {this.state.posts} />

                )}
            </div>
        )
    }

}

export default DisplayPosts
