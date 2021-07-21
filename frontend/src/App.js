import React, { Component } from "react";import AppRouter from "./AppRouter/appRouter";
import { isJwtExpired } from 'jwt-check-expiration';


class App extends Component {

 


    //Aller essayer de s'authentifier avec le token dans les cookies. En attendant, on affiche un loader
  
  render() {
    return (
      <AppRouter />
      //<AppProtectedRouter />
     
    )
  }
}

export default App;