import * as React from "react";
// import * as s from './HeaderLoggedIn.scss';
import { observer, inject } from "mobx-react";
import { Button } from "antd";
import { Link, withRouter } from "react-router-dom";

const HeaderLoggedIn = inject("store")(
  observer(props => (
    <React.Fragment>
      <span>{props.store.userName}</span>

      <Link to="/account">
        <Button type="primary">Account</Button>
      </Link>

      <Link to="/">
        <Button type="primary" onClick={() => props.store.logOut()}>
          Log Out
        </Button>
      </Link>
    </React.Fragment>
  ))
);

export default withRouter(HeaderLoggedIn);
