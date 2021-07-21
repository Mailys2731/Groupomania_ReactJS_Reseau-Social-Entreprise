import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import icon from './logos/icon.png';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

function Comments() {

    const classes = useStyles();
    axios.get('http://localhost:3000/api/comments')

            .then(res => {


                const comment = res.data.data
                return(comment)

            })

            .catch(error => {
                //this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img className={classes.icon} alt="avatar groupomania" src={icon} width="50px" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="username"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                This is comment
                                
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}

export default Comments