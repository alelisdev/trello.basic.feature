import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/headers/Header";
import 'react-loading-skeleton/dist/skeleton.css';
import Landing from "./pages/Landing";
import Board from "./pages/Board";
import Error404 from "./pages/Error404";

function App() {
    return (
        <>
            <Route path="/" component={Header} />
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/board/:id" component={Board} />
                <Route path="" component={Error404} />
            </Switch>
        </>
    );
}

export default App;
