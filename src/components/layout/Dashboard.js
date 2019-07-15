import React from "react";
import Clients from "../clients/Clients";
import styled from "styled-components/macro";

function Dashboard() {
  return (
    <div>
      <FlexContainer>
        <Clients />
      </FlexContainer>
    </div>
  );
}

export default Dashboard;

export const FlexContainer = styled.div``;
