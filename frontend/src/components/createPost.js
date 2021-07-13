import React, { Component } from 'react';
import PostDataService from '../services/posts-service';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        maxWidth: '90%',
    },

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
});

class CreatePost extends Component {

    constructor(props) {
        super(props)
    
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          description: '',
          imageUrl: '',
        }
      }
    
      onChangeDescription(e) {
        this.setState({ description: e.target.value })
      }
    
      onChangeImageUrl(e) {
        this.setState({ imageUrl: e.target.value.toString() })
      }
    
      onSubmit(e) {
        e.preventDefault()
    
        const newPost = {
          description: this.state.description,
          imageUrl: this.state.imageUrl,
        };
       
        PostDataService.createPost(newPost)
          .then((res) => {
            console.log('création du post avec succés !')
          }).catch((error) => {
            console.log(error);
          });

        //this.setState({ description: '', imageUrl: '' })
      }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <CreateIcon />
                        </Avatar>
                    }
                    disableTypography
                    title="Créer une publication"
                   
                />
                <CardContent>

                    <div>
                        <form onSubmit={this.onSubmit} className={classes.form}>
                            <TextField
                                color="secondary"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="A quoi pensez vous ?"
                                name="description"
                                value={this.state.description} onChange={this.onChangeDescription}
                            />
                            <TextField
                                color="secondary"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="imageUrl"
                                label="Ajoutez votre image !"
                                name="imageUrl"
                                input type="file"
                                focused
                                value={this.state.imageUrl} onChange={this.onChangeImageUrl}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                id="submitLogin"
                                className={classes.submit}
                            >
                                PUBLIER
                            </Button>
                        </form>
                    </div>
                </CardContent>

            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CreatePost)
