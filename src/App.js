import React, { useContext } from "react";
import { default as styled } from "styled-components/macro";

import { Provider } from "react-redux";
import store, { rrfProps } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { useTransition, animated } from "react-spring";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "../src/components/clients/AddClient";
import ClientDetails from "../src/components/clients/ClientDetails";
import EditClient from "../src/components/clients/EditClient";
import Login from "../src/components/auth/Login";
import Error from "../src/components/base/Error";
import ErrorBoundary from "../src/components/base/ErrorBoundary";

import "./App.css";

import { Switch, Route, __RouterContext } from "react-router-dom";

const App = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%,0)" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" }
  });

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <div className="App">
          <AppNavbar />
        </div>
        <div className="content">
          <Container>
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <ErrorBoundary>
                  <Switch location={item}>
                    <Route component={Dashboard} exact path="/" />
                    <Route component={AddClient} exact path="/client/add" />
                    <Route
                      component={EditClient}
                      exact
                      path="/client/edit/:id"
                    />
                    <Route component={ClientDetails} exact path="/client/:id" />
                    <Route component={Login} exact path="/login" />
                    <Route component={Error} exact path="/error" />
                  </Switch>
                </ErrorBoundary>
              </animated.div>
            ))}
          </Container>
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export const Container = styled.div`
  height: 100%;
  position: relative;
  margin-top: 40px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
`;

export default App;
