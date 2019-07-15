import React, { Component } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import Button from "../layout/Button";
import { FontIcon } from "../base/FontIcon";
import Input from "../base/input";
import AbsoluteWrapper from "../base/AbsoluteWrapper";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;

    const { firestore, history } = this.props;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    firestore
      .add({ collection: "user" }, newClient)
      .then(() => history.push("/"))
      .catch(err => console.log(err));
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <AbsoluteWrapper>
        <div>
          <Wrapper>
            <Link to="/">
              <Button>
                <FontIcon type="arrow-circle-left" />
                Back
              </Button>
            </Link>
          </Wrapper>
          <Card>
            <h1 style={{ textAlign: "center", padding: "20px" }}>
              Add a Client
            </h1>
            <Form onSubmit={this.onSubmit}>
              <FlexWrapper>
                <Input
                  label="First Name"
                  name="firstName"
                  required
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  required
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <Input
                  label="Phone"
                  name="phone"
                  required
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  label="Balance"
                  name="balance"
                  required
                  onChange={this.onChange}
                  value={this.state.balance}
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
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);

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
