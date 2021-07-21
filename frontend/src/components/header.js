
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoWhite from './logos/logo-white.png';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const styles = (theme) => ({
    root: {
        flexGrow: 1,

    },
    appBar: {
        backgroundColor:"grey"
    },
    toolBar:{
        justifyContent:"center"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    buttonAccount:{
        justifyContent:"flex-end"
    }
});

class Header extends Component {

    render() {
        const { classes } = this.props;


        


        return (
            <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar className={classes.toolBar}>
                    <img src={LogoWhite} height='50px'></img>
                    <Button 
                    href= "/Profile"
                    >
                        <AccountCircleIcon/>
                        
                    </Button>
                
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}

//<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"></IconButton>




export default withStyles(styles, { withTheme: "true" })(Header)
