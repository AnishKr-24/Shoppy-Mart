const express = require("express")
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();
// All Products...
router.route('/').get(getProducts).post(protect, admin,  createProduct);
//Specific Product
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);


module.exports = router;


// C - POST
// R - GET
// U - UPDATE
// D - DELETE