import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
        maxWidth: 500,
        minWidth: '70%',
        margin: "1rem",
        alignSelf: "center"

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
        minWidth: 150,
        width: "90%",
        marginTop: '1rem',
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

        comments: [],
        posts: this.props.posts,
        comment:""
    }


    onChangeComment(e) {
        this.setState({ comment: e.target.value })
    }

    submitComment = () => {

        const objectComment = {}
        objectComment.PostId = this.props.post.id
        objectComment.UserId = localStorage.getItem('userId')
        objectComment.userName = localStorage.getItem('userName')
        objectComment.comment = this.state.comment
        console.log(objectComment)

        axios.post("http://localhost:3000/api/comments/", objectComment)
            .then((response) => {
                const comment = response.data.data
                this.setState((prevState) => ({
                    comments: prevState.comments.concat({
                        id: comment.id, comment: comment.comment, postId: comment.PostId, userId: comment.UserId, userName: comment.userName
                    })
                }))
            })

            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            })


            this.setState({ comment: "" })

    }


    handleExpandClick = () => {
        if (!this.state.expanded) {
            //axios() Chercher les commentaires, Loading le temps qu'on charge, etc..., Croix rouge si erreur
            axios.get('http://localhost:3000/api/comments', { headers: { Authorization: `Bearer ${localStorage.token}` } })

                .then(res => {
                    const comments = res.data.data.map(comment => ({ id: comment.id, comment: comment.comment, postId: comment.PostId, userId: comment.UserId, userName: comment.userName }));
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

    buttonDelete = () => {
        const id = this.props.post.id;
        const admin = localStorage.admin;
            

        if (admin) {
            axios.delete(`http://localhost:3000/api/posts/${id}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then(res => {
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }




    render() {
        console.log(localStorage)
        const { classes } = this.props;
        const expanded = this.state.expanded;
        const postId = this.props.post.id;
        const admin = localStorage.admin;
        console.log(admin)
        return (

            <Card className={classes.root}>
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
                    <Typography variant="body1" color="textPrimary" component="p">
                        {this.props.post.description}
                    </Typography>
                    <img className={classes.image} src={this.props.post.imageUrl} alt='illustration du post'></img>
                    <div>
                        {

                            localStorage.admin=="true" && <Button
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={this.buttonDelete}
                            >
                                Supprimer cette publication
                            </Button>
                            

                        }
                    </div>

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        size='small'
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
                                    if (comment.postId === postId)
                                        return <Comment comment={comment} key={comment.id} />
                                    return true
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
