import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    error: false
  };
  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }
  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return <Redirect to="/error" />;
  }
}

export default ErrorBoundary;

// const FlyIn = keyframes`
//     from {
//         transform: translateX(-200%);
//     }

//     to {
//         transform: translateX(0%);
//     }
// `;

const FlyIn = keyframes`
    0% {
        left: -500px;
    }

    50% {
        left: 0px;
    }

    100% {
        left: -500px;
        display: none;
    }
`;

export const Card = styled.div`
  width: 250px;
  height: 100px;
  background-color: #b24c63;
  position: absolute;
  animation: ${FlyIn} 1s linear;
`;

export const ErrMsg = styled.h2``;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
