import React, { Component } from "react";
import styled from "styled-components";
import { FontIcon } from "../base/FontIcon";
import ReactTable from "react-table";
import Button from "../layout/Button";
import { Link } from "react-router-dom";
import "react-table/react-table.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients = [] } = props;
    // add Balance
    const total = clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);

    return { totalOwed: total };
  }
  render(props) {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    const columns = [
      {
        Header: "Name",
        id: "name",
        accessor: d => `${d.firstName} ${d.lastName}`,
        Cell: props => <span className="name">{props.value}</span>
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: props => <span className="email">{props.value}</span>
      },
      {
        Header: "Balance",
        accessor: "balance",
        Cell: props => (
          <span className="number">${parseFloat(props.value).toFixed(2)}</span>
        )
      },
      {
        Header: "Details",
        accessor: "id",
        Cell: e => (
          <Link to={`/clients/${clients.id}`}>
            <DetailButton>
              <FontIcon type="arrow-circle-right" />
              Show Details
            </DetailButton>
          </Link>
        )
      }
    ];
    if (clients) {
      return (
        <div>
          <Wrapper>
            <Heading>
              <h1>
                <FontIcon type="users" /> Clients
              </h1>
            </Heading>
            <h5>
              Total Owed <span>${parseFloat(totalOwed).toFixed(2)}</span>
            </h5>
            <Link to="/client/add">
              <Button>
                <FontIcon type="plus" />
                <span>New</span>
              </Button>
            </Link>
          </Wrapper>
          <Table
            defaultPageSize={10}
            className="-striped -highlight"
            data={clients}
            columns={columns}
          />
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "user" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.user
  }))
)(Clients);

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Heading = styled.div`
  display: flex;
  padding: 20px;
`;

export const DetailButton = styled(Button)`
  padding: 5px 10px;
  margin: 0;
  border-radius: 1px;
  background-color: rgb(27, 152, 224, 0.9);
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

const Table = styled(ReactTable)`
  &.ReactTable {
    width: 100%;
    border: none;
  }

  &.ReactTable .-pagination input {
    background: #333;
  }

  &.ReactTable .-pagination select {
    background: #333;
  }

  &.ReactTable .-pagination .-btn {
    color: rgba(255, 255, 255, 0.6);
  }

  &.ReactTable .rt-tfoot {
    box-shadow: none;
  }
  &.ReactTable .rt-thead .rt-th.-sort-asc,
  .ReactTable .rt-thead .rt-td.-sort-asc {
    box-shadow: none;
  }
  &.ReactTable .rt-thead .rt-th.-sort-desc,
  .ReactTable .rt-thead .rt-td.-sort-desc {
    box-shadow: none;
  }
  &.ReactTable .rt-thead.-header {
    box-shadow: none;
  }
  &.ReactTable .rt-thead .rt-th,
  .ReactTable .rt-thead .rt-td {
    padding: 15px;
    text-align: left;
    font-weight: bold;
  }
  &.ReactTable .rt-td {
    padding: 12px;
  }
`;
