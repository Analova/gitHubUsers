import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import GithubState from "./context/gitHub/GitHubState";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  //Search GithubUsers
  const SearchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    console.log(res.data);
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get a single GitHub User
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  };

  // Get users Repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Aletr
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <githubState>
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
                    <Search
                      SearchUsers={SearchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    loading={loading}
                    user={user}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </githubState>
  );
};

export default App;
