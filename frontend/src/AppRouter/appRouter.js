import React from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import SignIn from "../components/signin/signin";
import SignUp from "../components/signup/signup";
import HomePage from "../pages/home";
import ProtectedRoute from "react-protected-route-component"
import ProfileUser from '../pages/profile.user'
import { isJwtExpired } from 'jwt-check-expiration';

const history = createBrowserHistory();


class AppRouter extends React.Component {

    constructor(props) {
        super(props);
    
        this.guardFunction = this.guardFunction.bind(this);
    }
    
    guardFunction() { // fonction d'authentification de l'utilisateur
        const token = localStorage.getItem('token'); // récupération du token dans le localstorage
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
                    <ProtectedRoute path="/home"  redirectRoute="/" guardFunction={this.guardFunction} component={HomePage}   exact/>
                    <ProtectedRoute path="/profile" component={ProfileUser} guardFunction={this.guardFunction} exact />
                    <Route path="/" component={SignIn} exact history={history} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;