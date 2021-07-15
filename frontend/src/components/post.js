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
        width:"90%"
    }
});

class Post extends Component {

    state = {
        expanded: false,
        posts: []
    }

    componentDidMount() {
        // GET request using axios with error handling
        axios.get('http://localhost:3000/api/posts')

            //.then(console.log(res.data.data))

            .then(res =>
                this.setState({ posts: res.data.data })
            )
            .then(console.log(this.state.posts))
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
        
    }

    /*generateUrl = (post) => {
        console.log(this.state.posts)
        const blob = post.imageUrl.blob()
        const url = URL.createObjectURL(blob)
        const urlImage = new Image()
        urlImage.src = url
    }*/



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
                    <Card className={classes.root}>
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
                            <CardContent>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                )}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Post)
