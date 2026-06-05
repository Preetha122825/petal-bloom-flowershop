const router = require('express').Router();
const c = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
router.get('/', protect, c.getCart);
router.post('/', protect, c.addToCart);
router.put('/:productId', protect, c.updateCartItem);
router.delete('/', protect, c.clearCart);
module.exports = router;
