import * as React from "react";
import * as s from "./LoginForm.scss";

import { Form, Icon, Input, Button, Spin, message } from "antd";
import { observer, inject } from "mobx-react";

const FormItem = Form.Item;

const showFormError = () => {
  message.error("Error. Make sure you used correct email and password ");
};

@inject("store")
@observer
class LoginForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const textState = {
      emailPlaceholder: "Email",
      emailErrMessage: "Enter your email",
      passwordPlaceholder: "Password",
      passwordErrMessage: "Enter your password. At leas 6 characters"
    };
    const SpinnerIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const EmailIcon = <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />;
    const LockIcon = <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />;

    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("email", {
              initialValue: "artkoch@artkoch.ru",
              validateTrigger: "onBlur",
              rules: [
                { type: "email", message: "The input is not a valid email!" },
                { required: true, message: textState.emailErrMessage }
              ]
            })(
              <Input
                prefix={EmailIcon}
                placeholder={textState.emailPlaceholder}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              initialValue: "12345!@#123Hell",
              rules: [{ required: true, message: textState.passwordErrMessage }]
            })(
              <Input
                prefix={LockIcon}
                type="password"
                placeholder={textState.passwordPlaceholder}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
            {this.props.store.loginRequestState == "pending" && (
              <Spin className={s.spinner} indicator={SpinnerIcon} />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      !err && console.log("Received values of form: ", values);

      if (err) {
        showFormError();
        return;
      }

      this.props.store.login({
        email: values.email,
        password: values.password
      });
    });
  };
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
