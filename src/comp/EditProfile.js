import * as React from "react";
import * as s from "./EditProfile.scss";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Spin } from "antd";
import { observer, inject } from "mobx-react";

const FormItem = Form.Item;

@inject("store")
@observer
class EditProfile extends React.Component {
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
      <div className={s.wrapper}>
        <div className={s.formWrapper}>
          <h1>Edit Profile</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("email", {
                initialValue: this.props.store.userEmail,
                rules: [{ required: true, message: textState.emailErrMessage }]
              })(
                <Input
                  prefix={EmailIcon}
                  placeholder={textState.emailPlaceholder}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                initialValue: "",
                rules: [
                  { required: true, message: textState.passwordErrMessage }
                ]
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
                className="edit-profile-form-button"
              >
                Save
              </Button>
              {this.props.store.editProfileRequestState == "pending" && (
                <Spin className={s.spinner} indicator={SpinnerIcon} />
              )}
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }

  componentDidUpdate(){
    this.props.store.saveProfileRequestState === "error" && this.showFormError("Error. Something went wrong");
  }
  
  showFormError = (m) => {
    message.error(m)
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) console.log("Received values of form: ", values);

      this.props.store.saveProfile({
        email: values.email,
        password: values.password
      });
    });
  };
}

const WrappedEditProfile = withRouter(Form.create()(EditProfile));

export default WrappedEditProfile;
