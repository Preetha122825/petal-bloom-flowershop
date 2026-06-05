const router = require('express').Router();
const c = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');
router.post('/', protect, c.createOrder);
router.get('/my', protect, c.getMyOrders);
router.get('/:id', protect, c.getOrder);
router.get('/', protect, adminOnly, c.getAllOrders);
router.put('/:id/status', protect, adminOnly, c.updateOrderStatus);
module.exports = router;
