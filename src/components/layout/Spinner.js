import React from "react";
import { css } from "@emotion/core";
import { BounceLoader } from "react-spinners";
import AbsoluteWrapper from "../base/AbsoluteWrapper";

const override = css`
  display: block;
  margin: auto auto;
  border-color: red;
`;

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <AbsoluteWrapper>
        <div style={{ marginTop: "30vh" }}>
          <div className="sweet-loading">
            <BounceLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={"#1b98e0"}
              loading={this.state.loading}
            />
          </div>
        </div>
      </AbsoluteWrapper>
    );
  }
}

export default Spinner;
