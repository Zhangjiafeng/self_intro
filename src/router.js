import React from 'react';
import {Router,Route,Switch} from 'react-router-dom';
import MainPage from "./views/MainPage/MainPage";
import Login from "./views/Login/Login";
import Intro from "./views/Intro/Intro";
import createHistory from 'history/createBrowserHistory';
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'

export const browserHistory = createHistory();
export default class Routers extends React.Component{
    render(){
        return(
            <Router history={browserHistory}>
                <CacheSwitch>
                    <CacheRoute exact path="/" component={MainPage}/>
                    <CacheRoute exact path="/login" component={Login}/>
                    <CacheRoute path="/intro" component={Intro}/>
                </CacheSwitch>
            </Router>
        )
    }
}
