import * as React from "react";
import * as s from "./App.scss";

import Home from "./Home";
import Header from "./Header";
import EditProfile from "./EditProfile";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { observer, inject } from "mobx-react";

const App = inject("store")(
  observer(props => (
    <Router>
      <React.Fragment>
        <div className={s.wrapper}>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/account" component={EditProfile} />
          </Switch>

          <div className={s.footer}>2018 @ Powered by SlideSpiel.com</div>
        </div>
      </React.Fragment>
    </Router>
  ))
);

export default App;
