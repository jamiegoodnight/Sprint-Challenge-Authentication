import React from "react";

import axiosWithAuth from "./axiosWithAuth";

class DadJokes extends React.Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <>
        <button onClick={this.handleClick}>LOGOUT</button>
        <h2>DAD JOKES</h2>
        <>
          {this.state.jokes.map(jokes => (
            <h3 key={jokes.id}>{jokes.joke}</h3>
          ))}
        </>
      </>
    );
  }

  componentDidMount = () => {
    axiosWithAuth()
      .get("http://localhost:3300/api/jokes")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  };

  handleClick = e => {
    localStorage.removeItem("token");
  };
}

export default DadJokes;
