import React, { Component } from 'react';
import UserDataService from '../../services/users-service';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

//import useStyles from './stylesSignin';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Groupomania
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


class SignIn extends Component {

  constructor(props) {
    super(props)

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userName: '',
      email: '',
      password: ''
    }
  }

  onChangeUserName(e) {
    this.setState({ userName: e.target.value })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };
    console.log(user)

    UserDataService.login(user)
      .then((res) => {
        localStorage.setItem('userTokenLog', JSON.stringify(res.data));
        console.log('Connection ok')
        //window.location = "/mywall";
      }).catch((error) => {
        console.log(error);
        (window.alert("Identifiant/Mot de passe Incorrect"))
      });

    this.setState({ userName: '', email: '', password: '' })
  }
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div /*className={classes.paper}*/>
          <Avatar /*className={classes.avatar}*/>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <form onSubmit={this.onSubmit}/*className={classes.form}*/>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userName"
              label="userName"
              type="userName"
              id="userName"
              autoComplete="userName"
              value={this.state.userName} onChange={this.onChangeUserName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email} onChange={this.onChangeEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password} onChange={this.onChangePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              id="submitLogin"
            //className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );

  }


}
export default SignIn


/*const user = new FormData ();

user.append("username", document.getElementById('userName'));
user.append("email", document.getElementById('email'));
user.append("password", document.getElementById('password'));


console.log(user)


const loginUser = () => {
  UserDataService.login(user)
    .then(function (res) {
      //On traite la suite une fois la réponse obtenue
      console.log(res);
    })
    .catch(function (error) {
      //On traite ici les erreurs éventuellement survenues
      console.log(error);
    });
}
loginUser()*/