import * as React from "react";
import * as s from "./SignupForm.scss";

import { Form, Icon, Input, Button, Spin, message } from "antd";
import { observer, inject } from "mobx-react";

const FormItem = Form.Item;

const showFormError = () => {
  message.error("An error occured");
};

@inject("store")
@observer
class SignupForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const textState = {
      namePlaceholder: "Name",
      nameErrMessage: "Enter your name",
      emailPlaceholder: "Email",
      emailErrMessage: "Enter your email",
      passwordPlaceholder: "Password",
      passwordErrMessage: "Enter your password. At least 6 characters"
    };
    const SpinIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const EmailIcon = <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />;
    const LockIcon = <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />;
    const UserIcon = <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />;

    return (
      <React.Fragment>
        <h1>Create an account</h1>
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <FormItem>
            {getFieldDecorator("name", {
              initialValue: "Garry",
              rules: [{ required: false, message: textState.nameErrMessage }]
            })(
              <Input
                prefix={UserIcon}
                placeholder={textState.namePlaceholder}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              initialValue: "artkoch@artkoch.ru",
              validateTrigger: "onBlur",
              rules: [
                {
                  type: "email",
                  required: true,
                  message: textState.emailErrMessage
                }
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
              className="signup-form-button"
            >
              SignUp
            </Button>
            {this.props.store.signupRequestState == "pending" && (
              <Spin className={s.spinner} indicator={SpinIcon} />
            )}
          </FormItem>
        </Form>
      </React.Fragment>
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

      this.props.store.signup({
        email: values.email,
        password: values.password,
        name: values.name
      });
    });
  };
}

const WrappedSignupForm = Form.create()(SignupForm);

export default WrappedSignupForm;
