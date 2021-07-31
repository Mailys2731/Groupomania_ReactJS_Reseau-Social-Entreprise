import React, { Component } from "react"; import AppRouter from "./AppRouter/appRouter";

class App extends Component {
  

  state = {
    user: undefined,
    loading: true,
    admin:""
  }


  
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