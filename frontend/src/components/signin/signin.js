import React, { Component } from 'react';
import UserDataService from '../../services/users-service';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import logo from '../logos/logo1.png';
import jwt from 'jsonwebtoken';
import { isJwtExpired } from 'jwt-check-expiration';


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo1:{
    margin: theme.spacing(2),
  }
});


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

  /*componentDidMount() {
    const token = localStorage.getItem('token'); // récupération du token dans le localstorage
        if(!isJwtExpired(token)){ // si présence du token : accès accepté
         //props.history.push('/home')
          window.location.href="/home"
          console.log('token récupéré')
          return   
        }
        else{
          return false
        }
        
    /*const token = localStorage.getItem('userTokenLog'); // récupération du token dans le localstorage
        if( !isJwtExpired(token)){ // si présence du token : accès accepté
          console.log("token récupéré");
          window.location.href='/home'
            
            
        } else { // si pas de token : accès refusé
            alert("Accès refusé. Veuillez vous connecter !");
            localStorage.clear();
            return false;
        }
  }*/
  

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
    }
    

    UserDataService.login(user)
    .then(res => { // si requête ok
      const token = res.data.token
      const decodedToken = jwt.verify(token, 'CUSTOM_PRIVATE_KEY'); // vérification du token d'authentification utilisateur
      const userId = decodedToken.userId;
      localStorage.setItem('token', JSON.stringify(res.data.token)); // stockage du token dans le localstorage
      localStorage.setItem('userId', JSON.stringify(userId)); // stockage de l'id utilisateur dans le localstorage
     
  })
  .then(() => {
      UserDataService.getOneUser() // appel de la requête de récupération d'un utilisateur
          .then(res => { // si resuête ok
              const user = res.data;
              console.log(user)
              localStorage.setItem('user', JSON.stringify(user)); // stockage de l'utilisateur dans le localstorage
              console.log(localStorage)
          })
          .then(() => {
              this.props.history.push('/home')
          })
          .catch(error => { // si échec requête
              this.setState({error});
              alert('Nous n\'avons pas pu vous connecter, veuillez vérifier vos informations !');
          })
  })
    this.setState({ userName: '', email: '', password: '' })
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
            Connexion
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
              autoComplete="userName"
              value={this.state.userName} onChange={this.onChangeUserName}
            />
            <TextField
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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
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
              Se connecter
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Vous n'avez pas encore de compte? Créer un compte"}
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
export default withStyles(styles, { $withTheme: "true" })(SignIn)


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