import React, { Component } from "react"; import AppRouter from "./AppRouter/appRouter";

class App extends Component {
  

  state = {
    user: undefined,
    loading: true,
    admin:""
  }


  
  /*const token = localStorage.getItem('token'); // récupération du token dans le localstorage
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

    if (this.state.loading) {
      <div className="loading"></div>
    }
    return (
      <AppRouter user={this.state.user} />
      //<AppProtectedRouter />

    )
  }
}

export default App;