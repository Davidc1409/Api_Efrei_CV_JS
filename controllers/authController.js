const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
      const { email, password, lastname, surname } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
     // console.log('Hashed password:', hashedPassword);
      const newUser = new User({ email, password: hashedPassword, lastname, surname });
      await newUser.save();
      res.status(201).send({ message: 'User   created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).send({ message: 'Error creating user' });
    }
  };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User  not found' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token, userId: user._id, email: user.email });
  } catch (error) {
    res.status(400).send({ message: 'Error logging in' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('jwt');
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error logging out' });
  }
};