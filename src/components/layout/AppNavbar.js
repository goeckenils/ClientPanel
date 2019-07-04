import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "./Button";

class AppNavbar extends Component {
  render() {
    return (
      <Nav>
        <Container>
          <Link to="/">
            <Branding>ARPAOS</Branding>
          </Link>
          <Wrapper>
            <List>
              <ListItem>
                <Button>Login</Button>
              </ListItem>
              <ListItem>
                <Button>Register</Button>
              </ListItem>
            </List>
          </Wrapper>
        </Container>
      </Nav>
    );
  }
}

export default AppNavbar;

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
