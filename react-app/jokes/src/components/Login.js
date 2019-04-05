import React from "react";
import axios from "axios";

class Login extends React.Component {
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
          <button>LOGIN</button>
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
      .post("http://localhost:5000/api/auth/login", this.state)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default Login;
