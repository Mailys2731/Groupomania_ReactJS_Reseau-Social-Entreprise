import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import {createStore} from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux'
import setAuthorizationToken from "./services/setAuthorizationToken.js";

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

setAuthorizationToken(localStorage.token)

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

