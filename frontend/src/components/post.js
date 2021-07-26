import React, { Component } from 'react';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import icon from './logos/icon.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Comment from './Comment';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

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
    },
   
    
});

class Post extends Component {
    constructor(props) {
        super(props)

        this.onChangeComment = this.onChangeComment.bind(this)

    }


    state = {
        expanded: false,

        comments: []
    }

   /* componentDidMount() {
        const buttonDelete = document.getElementsByClassName('buttonDelete')
        this.props.posts.forEach(post => {
            if (post.userId != localStorage.UserId) {
            
                buttonDelete.setAttribut()
                  } else {
                      this.buttonDelete.style.display = 'block'
                  } 
        })

        console.log(document.getElementById('buttonDelete'))
   
    }*/

    onChangeComment(e) {
        this.setState({ comment: e.target.value })
    }

    submitComment = () => {

        /*const post = this.state.posts.map(post => {
            return {
                postId: post.postId
            }
        })
        console.log(post)*/
        const objectComment = {}
        objectComment.PostId = this.props.post.id
        objectComment.UserId = localStorage.getItem('userId')
        objectComment.userName = localStorage.getItem('userName')
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
            axios.get('http://localhost:3000/api/comments', { headers: { Authorization: `Bearer ${JSON.parse(localStorage.token)}` } })

                .then(res => {
                    const comments = res.data.data.map(comment => ({ comment: comment.comment, postId: comment.PostId, userId: comment.UserId, userName: comment.userName }));
                    this.setState({ comments })
                })
                .catch(error => {
                    this.setState({ errorMessage: error.message });
                    console.error('There was an error!', error);
                });


        }
        this.setState((prevState) => ({
            expanded: !prevState.expanded
        }))
    }
    
    buttonDelete  () {
        
    }



    render() {

        const { classes } = this.props;
        const expanded = this.state.expanded;
        const postId = this.props.post.id;

        return (

            <Card key={this.props.post.id} className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <img className={classes.icon} alt="avatar groupomania" src={icon} width="50px" />
                        </Avatar>
                    }
                    title={this.props.post.userName}
                    subheader={this.props.post.updatedAt}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.post.description}

                    </Typography>
                    <img className={classes.image} src={this.props.post.imageUrl}></img>

                    <Button
                        classes="buttonDelete"
                        color="secondary"
                        className={classes.buttonDelete}
                        startIcon={<DeleteIcon />}

                    >
                        Supprimer ma publication
                    </Button>

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
                <Collapse in={expanded} timeout="auto" unmountOnExit >
                    <Card>
                        <CardContent>
                            <div>
                                {this.state.comments.map(function (comment) {
                                    if (comment.postId == postId)
                                        return <Comment comment={comment} />
                                }

                                )}
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
                                    maxLength={8000}
                                    value={this.state.comment} onChange={this.onChangeComment}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    id="submitLogin"
                                    //className={classes.submit}
                                    onClick={() => this.submitComment(this.props.postId)}
                                >
                                    Poster mon commentaire
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Collapse>
            </Card>

        );
    }
}

export default withStyles(styles, { withTheme: "true" })(Post)
