import React, { Component } from 'react';
import axios from 'axios';
import Post from '../components/post'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        display:'flex',
        flexDirection:'column',
        alignItem:'center',
        margin:'0'
    }
})




class DisplayPosts extends Component {

    state = {
        posts: [],
       
    }
    

    componentDidMount() {
     
        axios.get('http://localhost:3000/api/posts', { headers: { Authorization: `Bearer ${localStorage.token}` } })

            .then(res => {
                
                const posts = res.data.data.map(post => ({ description: post.description, imageUrl: post.imageUrl, id: post.id, userId: post.UserId, userName: post.userName }));
                posts.reverse()

                this.setState({ posts })
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
           
    }

   
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.state.posts.map((post) =>

                    <Post post = {post} posts = {this.state.posts} key={post.id} />

                )}
            </div>
        )
    }

}


export default withStyles(styles, { withTheme: "true" })(DisplayPosts)
