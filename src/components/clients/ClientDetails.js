import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Button from "../layout/Button";
import styled from "styled-components/macro";
import { FontIcon } from "../base/FontIcon";
import Input from "../base/input";
import AbsoluteWrapper from "../base/AbsoluteWrapper";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    // Update in Firestore
    firestore.update({ collection: "user", doc: client.id }, clientUpdate);
  };

  onDeleteClick = () => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: "user", doc: client.id })
      .then(() => history.push("/"));
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    // if Balance form should display
    if (showBalanceUpdate) {
      balanceForm = (
        <Form onSubmit={this.balanceSubmit}>
          <div>
            <UpdateInput
              type="text"
              name="balanceUpdateAmount"
              value={balanceUpdateAmount}
              onChange={this.onChange}
              label="Add New Balance"
            />
            <Button value="Update" type="submit">
              Update
            </Button>
          </div>
        </Form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
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
              <BtnGroup>
                <Link to={`/client/edit/${client.id}`}>
                  <Button>Edit</Button>
                </Link>
                <DeleteBtn onClick={this.onDeleteClick}>Delete</DeleteBtn>
              </BtnGroup>
            </Wrapper>
            <Card>
              <h1 style={{ padding: "20px", textAlign: "center" }}>
                Client Details
              </h1>
              <DetailsHeader>
                <h2>
                  {client.firstName} {client.lastName}
                </h2>
              </DetailsHeader>
              <Group>
                <ClientID>
                  <h3>
                    Client ID:{" "}
                    <span style={{ color: "lightgrey" }}>{client.id}</span>
                  </h3>
                </ClientID>
                <Balance>
                  <h3>
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance <= 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          });
                        }}
                      >
                        {" "}
                        <FontIcon type="pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </Balance>
              </Group>
              <Group>
                <h3>Email: {client.email}</h3>
                <h3>Phone: {client.phone}</h3>
              </Group>
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
    console.log(ordered, props);
    const client = (ordered && ordered.client && ordered.client[0]) || {};
    return {
      client: client.id === props.match.params.id ? client : false
    };
  })
)(ClientDetails);

export const UpdateInput = styled(Input)`
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BtnGroup = styled.div`
  display: flex;
`;

export const DeleteBtn = styled(Button)`
  background-color: #b24c63;

  &:hover {
    background-color: rgba(178, 76, 99, 0.8);
  }
`;

export const Card = styled.div`
  max-width: 800px;
  margin: auto auto;
`;

export const DetailsHeader = styled.h3`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-bottom: solid 1px #1b98e0;
`;

export const ClientID = styled.div``;

export const Balance = styled.div``;

export const Group = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border-bottom: solid 1px #1b98e0;
`;

export const Form = styled.form`
  display: flex;
`;
