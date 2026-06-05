const router = require('express').Router();
const c = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/profile', protect, c.getProfile);
router.put('/profile', protect, c.updateProfile);
router.get('/wishlist', protect, c.getWishlist);
router.put('/wishlist/:productId', protect, c.toggleWishlist);
router.get('/', protect, adminOnly, c.getAllUsers);
module.exports = router;
