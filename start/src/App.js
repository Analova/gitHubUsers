import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import GithubState from "./context/gitHub/GitHubState";
import "./App.css";

const App = () => {
  const [alert, setAlert] = useState(null);

  // Set Aletr
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <>
      <GithubState>
        <Router>
          <div>
            <NavBar title="Github Finder" icon="fab fa-github" />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <>
                      <Search setAlert={showAlert} />
                      <Users />
                    </>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    </>
  );
};

export default App;
