import React from "react";
import { default as styled } from "styled-components";

import { Provider } from "react-redux";
import store, { rrfProps } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import "./App.css";

import { HashRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  // state = {
  //   darkMode: false
  // };

  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {/* <ThemeProvider theme={this.state.darkMode ? darkTheme : lightTheme}> */}
          <HashRouter>
            <div
              className="App"
              // onClick={() => this.setState({ darkMode: !this.state.darkMode })}
            >
              <AppNavbar />
            </div>
            <div className="content">
              <Container>
                <Switch>
                  <Route component={Dashboard} exact path="/" />
                </Switch>
              </Container>
            </div>
          </HashRouter>
          {/* </ThemeProvider> */}
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

// const darkTheme = {
//   primary: "#1b98e0"
// };

// const lightTheme = {
//   primary: "#00b894"
// };

export const Container = styled.div`
  margin-top: 40px;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
`;

export default App;
