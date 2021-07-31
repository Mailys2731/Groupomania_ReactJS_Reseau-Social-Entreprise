import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import icon from './logos/icon.png';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

class Comment extends Component {
    state= {
        comment:''
    }


    onSubmit(e) {
        axios.get('http://localhost:3000/api/comments')

            .then(res => {


                const comment = res.data.data
                return (comment)

            })

            .catch(error => {
                //this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            })

        
    }

    buttonDelete = () => {
        const id = this.props.comment.id;
        console.log(id)
        const admin = localStorage.admin;


        if (admin) {
            axios.delete(`http://localhost:3000/api/comments/${id}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then(res => {
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }


    render() {
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <img className={classes.icon} alt="avatar groupomania" src={icon} width="50px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.comment.userName}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {this.props.comment.comment}

                                </Typography>
                                
                            </React.Fragment>
                        }
                    />
                    <div>
                                    {

                                        localStorage.admin === "true" && <Button
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={this.buttonDelete}
                                            size='small'
                                        >
                                            supprimer
                                        </Button>


                                    }
                                </div>
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        )
    }
}

export default withStyles(styles, { withTheme: "true" })(Comment)
