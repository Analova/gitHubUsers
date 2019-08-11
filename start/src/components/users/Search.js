import React, { Component } from "react";

export class Search extends Component {
  state = {
    text: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter a name", "light");
    } else {
      this.props.SearchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };
  render() {
    const { clearUsers, showClear } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            value={this.state.text}
            placeholder="Search...."
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            | Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
