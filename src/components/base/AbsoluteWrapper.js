import React from "react";
import styled from "styled-components/macro";

const AbsoluteWrapper = ({ children }) => {
  return (
    <Wrapper>
      <div>{children}</div>
    </Wrapper>
  );
};

export default AbsoluteWrapper;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;
