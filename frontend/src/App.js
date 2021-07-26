import React, { Component } from "react";import AppRouter from "./AppRouter/appRouter";
import { isJwtExpired } from 'jwt-check-expiration';
import {createStore} from 'redux'
import axios from 'axios'
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './services/setAuthorizationToken';
import UserDataService from './services/users-service';

/*STORE -> GLOBALIZED STATE

//ACTION INCREMENT
const increment = () => {
  return{
    type:'INCREMENT'
  }
}
const decrement = () => {
  return{
    type:'DECREMENT'
  }
}
//REDUCER
const counter = (state=0, action) => {
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1
  }
}

let store = createStore(counter);

//Display it in the console
store.subscribe(() =>console.log(store.getState()))

//DISPATCH
store.dispatch(increment())
*/

class App extends Component {
  state = {
    user: undefined,
    loading: true
  }

  
  /*componentDidMount(props) {
    const token = localStorage.getItem('token'); // récupération du token dans le localstorage
    //Faire une requête vers ton serveur et récupérer les données du user (userID, etc...)
    //Modifier le state avec loading = false et les données du user si on est parvenu à l'authentifier


        if(!isJwtExpired(token)){ // si présence du token : accès accepté
         //props.history.push('/home')
          //window.location.href="/home"
          console.log('token récupéré')    
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
  


    //Aller essayer de s'authentifier avec le token dans les cookies. En attendant, on affiche un loader
  
  render() {
  
    if (this.state.loading ) {
      <div className="loading"></div>
    } 
    return (
      <AppRouter user={this.state.user} />
      //<AppProtectedRouter />
     
    )
  }
}

export default App;