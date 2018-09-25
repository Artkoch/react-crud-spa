import * as React from 'react';
import Home from "./Home";
import * as s from './App.scss';
// import * as s from './Home.scss';
// import Account from "./Account";
// import HeaderLoggedIn from './HeaderLoggedIn';
import Header from './Header';
import {  BrowserRouter as Router, Route, Link, withRouter, Switch, Redirect } from "react-router-dom";
import { observer, inject } from 'mobx-react';

import EditProfile from './EditProfile';

// const Unblock = () => withRouter(Header);

const App = inject("store")(observer((props) =>  {
    return (
      <Router>
        <React.Fragment>
          <div className={s.wrapper}>
            <Header />

            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/account' component={EditProfile} />
            </Switch>

            <div className={s.footer}>2018 @ Powered by SlideSpiel.com</div>
          </div>
        </React.Fragment>
    </Router>

    );
}))



export default App