import * as React from 'react';
import * as s from './Header.scss';
import Logo from "../img/logo.jpg";
import {  BrowserRouter as Router, Route, Link, withRouter, Switch, Redirect } from "react-router-dom";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderAuth from "./HeaderAuth";
import { observer, inject } from 'mobx-react';

const Header = inject("store")(observer((props) => 
  <div className={s.header}>
    <div className={s.logo}>
      <img className={s.logoSelf} src={Logo}/>
    </div>

    <div className={s.tool}>
      {
        props.store.isLoggedIn
          ? <HeaderLoggedIn/>
          : <HeaderAuth/>
      }
    </div>

  </div>
))

export default withRouter(Header)