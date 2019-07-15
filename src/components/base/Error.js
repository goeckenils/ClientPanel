import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

class Error extends Component {
  render() {
    return (
      <div>
        <Card>
          <Wrapper>
            <ErrMsg>Wrong nigga</ErrMsg>
          </Wrapper>
        </Card>
      </div>
    );
  }
}

export default Error;

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
