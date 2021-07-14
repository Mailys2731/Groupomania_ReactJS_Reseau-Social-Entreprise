import React from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import signin from "../components/signin/signin";
import signup from "../components/signup/signup";
import HomePage from "../pages/home";


const history = createBrowserHistory();


class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" component={HomePage} exact={true} />
                    <Route path="/sign-in" component={signin} history={history} />
                    <Route path="/sign-up" component={signup} />
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;