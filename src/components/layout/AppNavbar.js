import React, { Component } from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Button from "../layout/Button";
import { FontIcon } from "../base/FontIcon";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase, history } = this.props;

    firebase
      .logout()
      .then(() => history.push("/login"))
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <Nav>
        <Container>
          <Link to="/">
            <Branding>ARPAOS</Branding>
          </Link>
          <Wrapper>
            {isAuthenticated ? null : (
              <List>
                <ListItem>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </ListItem>
                <ListItem>
                  <Button>Register</Button>
                </ListItem>
              </List>
            )}
            {isAuthenticated ? (
              <List>
                <ListItem>
                  <h4>
                    <FontIcon type="user" />
                    {auth.email}
                  </h4>
                </ListItem>
                <ListItem>
                  <Logout onClick={this.onLogoutClick}>
                    <FontIcon type="power-off" /> Logout
                  </Logout>
                </ListItem>
              </List>
            ) : null}
          </Wrapper>
        </Container>
      </Nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  withRouter,
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavbar);

export const Nav = styled.div`
  width: 100%;
  background-color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.009);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export const Branding = styled.h1`
  font-weight: bold;
  font-size: 35px;
  padding: 10px;
  color: #1b98e0;
`;

export const Wrapper = styled.div``;

export const List = styled.ol`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ListItem = styled.li`
  margin: 0px 10px;
`;

export const Logout = styled(Button)`
  background-color: #b24c63;

  &:hover {
    background-color: rgba(178, 76, 99, 0.8);
  }
`;
