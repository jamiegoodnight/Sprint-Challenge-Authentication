const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./routesModels");
const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  if (user.username && user.password) {
    db.addUser(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was a problem saving your user!" });
      });
  } else {
    res
      .status(401)
      .json({ message: "Please provide a username and password!" });
  }
}

function login(req, res) {
  const { username, password } = req.body;

  if (username && password) {
    db.getUserByName({ username })
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: "LOGGED IN", token });
        } else {
          res.status(401).json({ message: "Invalid username or password!" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "There was a problem logging in!" });
      });
  } else {
    res
      .status(401)
      .json({ message: "Please provide a username and password to login!" });
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
