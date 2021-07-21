import React, { Component } from 'react';
import UserDataService from '../services/users-service';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import icon from './logos/icon.png';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Comments from './Comments';
import SendIcon from '@material-ui/icons/Send';



const styles = theme => ({
    root: {
        maxWidth: 345,
        margin: "1rem",
        justifyContent: "center"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },

    avatar: {
        backgroundColor: red[500],
    },

    image: {
        width: "90%"
    },

    formComment: {
        display: "flex",
        marginTop: "20px"
    },

    commentInput: {
        flex: "1"
    }
});

class Post extends Component {
    constructor(props) {
        super(props)

        this.onChangeComment = this.onChangeComment.bind(this)

    }

    state = {
        expanded: false,
        posts: [],
        comment: ''
    }

    componentDidMount() {
        // GET request using axios with error handling
        axios.get('http://localhost:3000/api/posts')

            .then(res => {
                const posts = res.data.data.map(post => ({ description: post.description, imageUrl: post.imageUrl, postId: post.postId, userId: post.userId }));
                this.setState({ posts });
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });

    }

    onChangeComment(e) {
        this.setState({ comment: e.target.value })
    }

    submitComment = () => {
        console.log(this.state.posts)
        /*const post = this.state.posts.map(post => {
            return {
                postId: post.postId
            }
        })
        console.log(post)*/
        const objectComment = {}
        //objectComment.postId = post.postId
        objectComment.userId = 1
        objectComment.postId = 1


        objectComment.comment = this.state.comment
        console.log(objectComment)

        axios.post("http://localhost:3000/api/comments/", objectComment)

            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            })


    }


    handleExpandClick = () => {
        if (!this.state.expanded) {
            //axios() Chercher les commentaires, Loading le temps qu'on charge, etc..., Croix rouge si erreur
        }
        this.setState((prevState) => ({
            expanded: !prevState.expanded
        }))
    }


    render() {

        const { classes } = this.props;
        const expanded = this.state.expanded;


        return (
            <div className={classes.containerCard}>
                {this.state.posts.map((post) =>
                    <Card key={post.postId} className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    <img className={classes.icon} alt="avatar groupomania" src={icon} width="50px" />
                                </Avatar>
                            }

                            title="PSEUDO USER"
                            subheader={post.updatedAt}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.description}
                            </Typography>
                            <img className={classes.image} src={post.imageUrl}></img>
                        </CardContent>
                        <CardActions disableSpacing>

                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                                Commentaires
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Card>
                                <CardContent>
                                    <div>
                                        <Comments />
                                    </div>
                                    <form method="post">
                                        <TextField
                                            color="secondary"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="commentaire"
                                            label="Donnez votre avis!"
                                            name="commentaire"
                                            value={this.state.comment} onChange={this.onChangeComment}
                                        />
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            id="submitLogin"
                                            //className={classes.submit}
                                            onClick={this.submitComment}
                                        >
                                            Poster mon commentaire
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Collapse>
                    </Card>
                )}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: "true" })(Post)
