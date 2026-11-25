const User = require('../models/User');

exports.getProfile    = async (req, res) => res.json({ success: true, user: req.user });
exports.updateProfile = async (req, res) => res.json({ success: true, user: await User.findByIdAndUpdate(req.user._id, { name: req.body.name, phone: req.body.phone }, { new: true }).select('-password') });
exports.getWishlist   = async (req, res) => res.json({ success: true, wishlist: (await User.findById(req.user._id).populate('wishlist')).wishlist });
exports.toggleWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  const idx  = user.wishlist.indexOf(req.params.productId);
  if (idx > -1) user.wishlist.splice(idx, 1); else user.wishlist.push(req.params.productId);
  await user.save();
  res.json({ success: true, wishlist: user.wishlist });
};
exports.getAllUsers = async (req, res) => res.json({ success: true, users: await User.find().select('-password').sort({ createdAt: -1 }) });
