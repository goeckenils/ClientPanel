import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Button from "../layout/Button";
import styled from "styled-components/macro";
import { FontIcon } from "../base/FontIcon";
import AbsoluteWrapper from "../base/AbsoluteWrapper";
import Input from "../base/input";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // Create Refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { firestore, client, history, match } = this.props;

    // Updated CLient
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    // Update CLient in Firestore
    firestore
      .update({ collection: "user", doc: client.id }, updClient)
      .then(() => history.push(`/client/${match.params.id}`));
  };

  render() {
    const { client } = this.props;
    if (client) {
      return (
        <AbsoluteWrapper>
          <div>
            <Card>
              <h1 style={{ textAlign: "center", padding: "20px" }}>
                Edit Client
              </h1>
              <Form onSubmit={this.onSubmit}>
                <FlexWrapper>
                  <EditInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    required
                    minLength="2"
                    innerRef={this.firstNameInput}
                    value={client.firstName}
                  />
                  <EditInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                    required
                    minLength="2"
                    innerRef={this.lastNameInput}
                    value={client.lastName}
                  />
                </FlexWrapper>
                <FlexWrapper>
                  <EditInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    innerRef={this.emailInput}
                    value={client.email}
                  />
                  <EditInput
                    label="Phone"
                    name="phone"
                    type="phone"
                    required
                    minLength="2"
                    innerRef={this.phoneInput}
                    value={client.phone}
                  />
                </FlexWrapper>
                <FlexWrapper>
                  <EditInput
                    label="Balance"
                    name="balance"
                    type="text"
                    required
                    innerRef={this.balanceInput}
                    value={client.balance}
                  />
                </FlexWrapper>
                <FlexWrapper>
                  <AddButton type="submit">Submit</AddButton>
                </FlexWrapper>
              </Form>
            </Card>
          </div>
        </AbsoluteWrapper>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "user", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => {
    const client = (ordered && ordered.client && ordered.client[0]) || {};
    return {
      client: client.id === props.match.params.id ? client : false
    };
  })
)(EditClient);

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AddButton = styled(Button)`
  margin: 30px 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
`;

export const Card = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const EditInput = styled(Input)`
  .InputGroup {
    margin: 10px;
  }
`;
