import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import App from "./src/comp/App";
import { Provider } from 'mobx-react';
import { BrowserRouter } from "react-router-dom";

import store from "./store";

const AppWrapper = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
    );

ReactDOM.render(
  <AppWrapper/>,
  document.getElementById("app")
);