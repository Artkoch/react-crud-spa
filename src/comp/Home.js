import * as React from "react";
import { Button } from "antd";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

import * as s from "./Home.scss";

const Home = inject("store")(
  observer(props => {
    const { store } = props;

    return (
      <React.Fragment>
        <div className={s.main}>
          <div className={s.content}>
            <h1 className={s.title}>Access top medical education now!</h1>
            <ul className={s.list}>
              <li>24-hour access on desktop & mobile devices</li>
              <li>82 presentations structured into 5 tracks</li>
              <li>40+ hours of CME</li>
            </ul>

            <Button
              type="primary"
              onClick={() => store.toggleModal(true, "signup")}
            >
              Create Account
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  })
);

const HomeWrapper = withRouter(Home);

export default HomeWrapper;
