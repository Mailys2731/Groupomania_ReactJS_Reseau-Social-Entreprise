import React from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import SignIn from "../components/signin/signin";
import SignUp from "../components/signup/signup";
import HomePage from "../pages/home";
import ProtectedRoute from "react-protected-route-component"
import ProfileUser from '../pages/profile.user'
import { isJwtExpired } from 'jwt-check-expiration';
import axios from 'axios';
import swal from "sweetalert2"

const history = createBrowserHistory();


class AppRouter extends React.Component {

    constructor(props) {
        super(props);
    
        this.guardFunction = this.guardFunction.bind(this);
    }

    state = {
        user: undefined,
        loading: true,
        admin:""
      }
    

    componentDidMount() {
        const token = localStorage.token;
        const userId = localStorage.userId;
        if (!userId) {
          console.log('il faut se connecter')
        
        }
        else {
          axios.get(`http://localhost:3000/api/users/${userId}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
    
            .then(res => {
              console.log(res.data.admin)
              this.setState({admin:res.data.admin})
              localStorage.setItem('admin', res.data.admin)
              if (token === res.data.token) {
                console.log('Connexion déjà établie')
                //this.state.loading = false
                history.push('/home')
                
              }
            })
            .catch(error => {
              console.log(error)
              new swal("Une erreur est survenue", "veuillez nous excuser pour la gêne occasionnée", "warning")
            })
            
            
        }
        
      }
    
    guardFunction() { // fonction d'authentification de l'utilisateur
        const token = localStorage.token; // récupération du token dans le localstorage
        console.log(token)
        if(!isJwtExpired(token)){ // si présence du token : accès accepté
         
          console.log('token récupéré')
            return true
            
        } else { // si pas de token : accès refusé
            alert("Accès refusé. Veuillez vous connecter !");
            localStorage.clear();
            return false;
        }
    }
  
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <ProtectedRoute path="/home"  redirectRoute="/" guardFunction={this.guardFunction} component={HomePage} user={this.props.user}   exact/>
                    <ProtectedRoute path="/profile" component={ProfileUser} guardFunction={this.guardFunction} exact />
                    <Route path="/" component={SignIn} exact history={history} login={this.login}  />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;