const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl: bodyImageUrl } = req.body;
        let imageUrl = bodyImageUrl || '';
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
            } catch (cloudErr) {
                console.warn('Cloudinary upload failed, falling back to local path:', cloudErr.message);
                imageUrl = `/uploads/${req.file.filename}`;
            }
        }
        if (!imageUrl) {
            imageUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop';
        }
        const product = new Product({
            name,
            description,
            price: Number(price),
            category,
            stock: Number(stock),
            imageUrl
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl: bodyImageUrl } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            if (name !== undefined) product.name = name;
            if (description !== undefined) product.description = description;
            if (price !== undefined) product.price = Number(price);
            if (category !== undefined) product.category = category;
            if (stock !== undefined) product.stock = Number(stock);
            if (bodyImageUrl !== undefined && bodyImageUrl.trim() !== '') {
                product.imageUrl = bodyImageUrl;
            }
            if (req.file) {
                try {
                    const result = await cloudinary.uploader.upload(req.file.path);
                    product.imageUrl = result.secure_url;
                } catch (cloudErr) {
                    console.warn('Cloudinary upload failed, falling back to local path:', cloudErr.message);
                    product.imageUrl = `/uploads/${req.file.filename}`;
                }
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product Not Found' });
        }
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
