import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import setAuthorizationToken from "./services/setAuthorizationToken.js";



setAuthorizationToken(localStorage.token)

ReactDOM.render(
    <App/>
  ,
  document.getElementById("root")
);

