import * as React from 'react';
import * as s from './HeaderAuth.scss';
import { observer, inject } from 'mobx-react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import {  BrowserRouter as withRouter} from "react-router-dom";

const HeaderAuth = inject("store")(observer((props) =>  {
  const {store} = props;
  
    return (
      <React.Fragment>
        <Button type="primary" onClick={() => store.toggleModal(true, 'login')}>Login...</Button>
        <Button type="primary" onClick={() => store.toggleModal(true, 'signup')}>SignUp...</Button>

        <Modal
          centered
          footer={null}
          bodyStyle={{ padding: '50px' }}
          visible={store.isModalVisible}
          onCancel={() => store.toggleModal(false)}
        >
          {
            store.renderModelContent === 'login' 
              ? <LoginForm/>
              : <SignupForm/>
          }
        </Modal>
      </React.Fragment>
    );
  }
))

const RoutWrapper = () => withRouter(HeaderAuth)

export default HeaderAuth