import React, { Component } from "react";import AppRouter from "./AppRouter/appRouter";


class App extends Component {
  componentDidMount() {
    console.log("ok");
    //Aller essayer de s'authentifier avec le token dans les cookies. En attendant, on affiche un loader
  }
  render() {
    return (
      <AppRouter />
      //<AppProtectedRouter />
     
    )
  }
}

export default App;