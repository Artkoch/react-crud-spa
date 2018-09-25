import * as React from 'react';
import * as s from './Home.scss';
import HeaderAccount from './HeaderLoggedIn';
import HeaderAuth from './HeaderAuth';
import { observer, inject } from 'mobx-react';
import { Modal, Button } from 'antd';
import logo from '../img/logo.jpg'

import {  BrowserRouter as Router, Route, Link, withRouter, Switch, Redirect } from "react-router-dom";

const Home = inject("store")(observer((props) =>  {
  const { store } = props;

  return (
    <React.Fragment>
      <div className={s.main}>
        <div className={s.content}>
          <h1>Access top medical education now!</h1>
          <ul>
            <li>24-hour access on desktop & mobile devices</li>
            <li>82 presentations structured into 5 tracks</li>
            <li>40+ hours of CME</li>
          </ul>
          

          <Button type="primary" onClick={() => store.toggleModal(true, 'signup')}>Create Account</Button>

        </div>
      </div>

      {/* <div className={s.footer}>
        2018 @ Powered by SlideSpiel.com
      </div> */}
    </React.Fragment>
  );
}));

export default withRouter(Home)