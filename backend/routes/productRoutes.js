const express = require("express")
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})
// All Products...
router.route('/').get(getProducts).post(protect, admin, upload.single('image'),  createProduct);
//Specific Product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);


module.exports = router;


// C - POST
// R - GET
// U - UPDATE
// D - DELETE