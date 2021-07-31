import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../logos/logo1.png';
import { validEmailRegex, validPasswordRegex } from "../../services/validation";
import axios from 'axios'
import swal from 'sweetalert2';


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

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo1: {
    margin: theme.spacing(2),
  }
});



class SignUp extends Component {

  constructor(props) {
    super(props)



    this.state = {
      userName: '',
      email: '',
      password: '',
      userNameError: false,
      emailError: false,
      passwordError: false

    }
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChangeUserName(e) {
    this.setState({ userName: e.target.value, descriptionError: false })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value, emailError: false })
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value, passwordError: false })
  }

  formValid() {
    let response = true;
    if (!(validEmailRegex.test(this.state.email))) {
      console.log('Adresse email invalide')
      response = false
    }

    if (!(validPasswordRegex.test(this.state.password))) {
      console.log('Mot de passe invalide')
      response = false
    }
    return response
  }


  onSubmit(e) {
    e.preventDefault()
    let submit = true;
    if (!this.state.userName) {
      this.setState(() => ({
        userNameError: true
      }))
      submit = false;
    }
    if ((!this.state.email) || (!(validEmailRegex.test(this.state.email)))) {
      this.setState(() => ({
        emailError: true
      }))
      submit = false;
    }

    if ((!this.state.password) || (!(validPasswordRegex.test(this.state.password)))) {
      this.setState(() => ({
        passwordError: true
      }))
      submit = false;
    }

    if (!submit) {
      return false;
    }

    const user = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };


    axios.post('http://localhost:3000/api/users/signup', user)
      .then(() => {
        console.log('Utilisateur connecté avec succés')
        new swal("Compte créé avec succès", "Connectez vous pour accéder au feed !", "success")
      })
      
      .catch(error => {
        console.log(error)
        new swal("Une erreur nous enpêche de créer votre compte", "veuillez nous excuser pour la gêne occasionnée", "warning");

      })
      .then(
        this.props.history.push('/')
      )
  }

  render() {

    const { classes } = this.props;


    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img className={classes.logo1} alt="logo groupomania" src={logo} width="300px" />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Créer un compte
          </Typography>
          <form onSubmit={this.onSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userName"
              label="Pseudo"
              type="userName"
              id="userName"
              value={this.state.userName} onChange={this.onChangeUserName}
              error={this.state.userNameError}
            />

            <TextField
              error={this.state.emailError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email} onChange={this.onChangeEmail}
            />
            <TextField
              error={this.state.passwordError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe (minimum 7 caractères et 1 chiffre)"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password} onChange={this.onChangePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              id="submitLogin"
              className={classes.submit}
            >
              Créer mon compte
            </Button>
            <Link href="/">
              Me connecter
            </Link>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )

  }


}
export default withStyles(styles, { $withTheme: "true" })(SignUp)
