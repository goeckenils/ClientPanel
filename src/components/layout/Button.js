import React, { Component } from "react";
import styled from "styled-components";

import { FontIcon } from "../base/FontIcon";

class Button extends Component {
  render() {
    const { children, type = "button", ...props } = this.props;
    return (
      <MainButton type={type} {...props}>
        {children}
      </MainButton>
    );
  }
}

export default Button;

export const MainButton = styled.button`
  padding: 15px 30px;
  /* background-color: ${props => props.theme.primary}; */
  background-color:#1b98e0;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin: 10px 0px;
  width: 100%;
  border: 0;
  outline: 0;
  border-radius: 1px;
  cursor: pointer;
  display: block;
  transition: all 0.3s ease;

  ${FontIcon} {
    padding-right: 8px;
  }

  &:hover {
    background-color: rgb(27, 152, 224, 0.8);
  }

  &:focus {
    background-color: rgb(27, 152, 224, 0.7);
  }
`;
