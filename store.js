import { observable, action } from "mobx";
import axios from "axios";
import qs from "qs";

const baseURL = "https://penxy-mock-api.herokuapp.com/";
const login = "/token";
const signup = "/signup";
const profile = "/profile";

const requestParams = (
  dataToSend,
  url,
  method = "POST",
  headers = { "content-type": "application/x-www-form-urlencoded" }
) => ({
  method: method,
  headers: headers,
  data: qs.stringify(dataToSend),
  baseURL: baseURL,
  url: url
});

class Store {
  @observable
  token = "";
  @observable
  isLoggedIn = false;
  @observable
  loginRequestState = "stop"; // pending | done | error | stop
  @observable
  signupRequestState = "stop"; // pending | done | error | stop

  @observable
  userName = "";
  @observable
  userEmail = "";

  @observable
  isModalVisible = false;
  @observable
  renderModelContent = "login";

  @action
  setToken(data) {
    const { access_token } = data;
    this.token = access_token;
    sessionStorage.setItem("cord_token", access_token);
  }

  @action
  setUser(data) {
    const { access_token, name, email } = data;
    this.userName = name;
    this.userEmail = email;
  }

  @action
  async login(dataToSend) {
    this.loginRequestState = "pending";

    try {
      const params = requestParams(dataToSend, login);
      const response = await axios(params);
      this.loginRequestState = "done";

      this.setToken(response.data);
      this.setUser(response.data);

      this.isLoggedIn = true;
      this.isModalVisible = false;
    } catch (error) {
      this.loginRequestState = "error";
      console.error(error);
      this.loginRequestState = "stop";
    }
  }

  @action
  async signup(dataToSend) {
    this.signupRequestState = "pending";

    try {
      const params = requestParams(dataToSend, signup);
      const response = await axios(params);
      this.signupRequestState = "done";

      this.setToken(response.data);
      this.setUser(response.data);

      this.isLoggedIn = true;
      this.isModalVisible = false;
    } catch (error) {
      this.signupRequestState = "error";
      console.error(error);
    }
  }

  @action
  async saveProfile(dataToSend) {
    this.saveProfileRequestState = "pending";

    try {
      const params = requestParams(dataToSend, profile, "PUT", {
        Authorization: "Bearer " + this.token
      });
      const response = await axios(params);
      this.saveProfileRequestState = "done";

      this.setUser(response.data);
      this.isLoggedIn = true;
    } catch (error) {
      this.saveProfileRequestState = "error";
      console.error(error);
    }
  }

  @action
  logOut() {
    this.isLoggedIn = false;
    this.token = "";
  }

  @action
  toggleModal(toggleState, renderContent) {
    this.isModalVisible = toggleState;
    this.renderModelContent = renderContent;
  }
}

export default new Store();
