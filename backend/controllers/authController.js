const User = require('../models/User');
const jwt  = require('jsonwebtoken');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'All fields required' });
  if (await User.findOne({ email }))
    return res.status(400).json({ success: false, message: 'Email already registered' });
  const user  = await User.create({ name, email, password });
  const token = signToken(user._id);
  res.status(201).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const token = signToken(user._id);
  res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.getMe = async (req, res) => res.json({ success: true, user: req.user });

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'admin' });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  res.json({ success: true, token: signToken(user._id), user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
};
