import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="string"
            name="username"
            value={this.state.username}
            placeholder="username"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.handleChange}
          />
          <button>SIGN UP</button>
        </form>
      </>
    );
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/api/register", this.state)
      .then(res => {
        console.log(res);
        this.setState({
          username: "",
          password: ""
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default SignUp;
