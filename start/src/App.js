import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";
import { async } from "q";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: []
  };
  // async componentDidMount() {
  //   // console.log(REACT_APP_GITHUB_CLIENT_SECRET)
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users`);
  //   console.log(res.data);
  //   this.setState({ users: res.data, loading: false });
  // }

  //Search GithubUsers
  SearchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    console.log(res.data);
    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  // Get a single GitHub User
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}`);
    this.setState({ user: res.data, loading: false });
  };

  // Get users Repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    this.setState({ repos: res.data, loading: false });
  };

  // Set Aletr
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
        <div>
          <NavBar title="Github Finder" icon="fab fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <>
                    <Search
                      SearchUsers={this.SearchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
    );
  }
}

export default App;
