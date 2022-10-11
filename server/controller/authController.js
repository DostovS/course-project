const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccestoken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

class authRouter {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, name, lastName, password, role, email } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = new User({
        username: username,
        name: name,
        lastName: lastName,
        password: hashPassword,
        role: role,
        email: email,
      });
      await user.save();
      return res.json({ message: "User created" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = generateAccestoken(user._id, user.roles);
      user.lastLogin = Date.now();
      await user.save();
      const result = { token: token, user: user };
      return res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login Error" });
    }
  }
  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const { name, lastName, email, username } = req.body;
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      user.name = name;
      user.lastName = lastName;
      user.email = email;
      user.username = username;
      await user.save();
      res.status(200).json({ message: "User updated" });
    } catch (err) {
      console.log(err);
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
  async getUserByUsername(req, res) {
    try {
      const username = req.body.username;
      const users = await User.find();
      const user = users.find((user) => user.username === username);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }
  async changeStatus(req, res) {
    try {
      const id = req.params.id;
      const { role } = req.body;
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      user.role = role;
      await user.save();
      res.status(200).json({ message: "Status changed" });
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      res.status(204).json({ message: "User deleted" });
      await user.remove();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authRouter();