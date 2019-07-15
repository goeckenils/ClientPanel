import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import Button from "../layout/Button";
import styled from "styled-components/macro";
import { FontIcon } from "../base/FontIcon";
import PropTypes from "prop-types";
import Input from "../base/input";
import AbsoluteWrapper from "../base/AbsoluteWrapper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

class Login extends Component {
  state = {
    email: "",
    password: "",
    hasError: false
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;
    const { history } = this.props;
    firebase
      .login({
        email,
        password
      })
      .then(() => history.push("/"))
      .catch(err => {
        toast.error("Wrong Email or Password, please check", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <AbsoluteWrapper>
        <div>
          <ToastContainer className="myowntoast" toastClassName="owntoast" />
          {/* {this.state.hasError ? <Error /> : null} */}
          <Card>
            <Column onSubmit={this.onSubmit}>
              <Heading>
                <h1>
                  <FontIcon type="lock" /> Login
                </h1>
              </Heading>
              <Input
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                label="Email"
                type="text"
                required
              />
              <Input
                onChange={this.onChange}
                value={this.state.password}
                name="password"
                label="Password"
                type="password"
                required
              />
              <EnterButton type="submit">Enter</EnterButton>
            </Column>
          </Card>
        </div>
      </AbsoluteWrapper>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);

export const Card = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20vh;
  max-width: 450px;
  padding: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.009);
  text-align: center;
`;

export const Column = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: center;
`;

export const EnterButton = styled(Button)`
  margin-top: 30px;
`;
